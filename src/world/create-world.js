import * as THREE from 'three';
import RAPIER from '@dimforge/rapier3d-compat';
import { createBus } from './bus.js';
import { createCharacter } from './character.js';
import { createInput } from './input.js';
import { createTown } from './town.js';
import { clamp, damp, disposeObject } from './utils.js';

const FIXED_STEP = 1 / 60;
const PLAYER_RADIUS = .35;
const PLAYER_HALF_HEIGHT = .55;
const PLAYER_CENTER_HEIGHT = PLAYER_RADIUS + PLAYER_HALF_HEIGHT;
const SPAWN_POSITION = new THREE.Vector3(0, PLAYER_CENTER_HEIGHT, 0);
const UP = new THREE.Vector3(0, 1, 0);

export function createWorld(options = {}) {
  const { container } = options;
  if (!(container instanceof HTMLElement)) throw new TypeError('createWorld requires a valid container element');

  let disposed = false;
  let started = false;
  let initialized = false;
  let initializing = null;
  let mode = 'world';
  let frameId = 0;
  let lastTime = 0;
  let accumulator = 0;
  let frameCount = 0;
  let averageFps = 0;
  let labelUpdateElapsed = 0;
  let nearest = null;
  let previousNearKey = '';
  let actualCameraDistance = 7;
  let grounded = false;
  let wasGrounded = false;
  let coyoteTime = 0;
  let jumpBuffer = 0;
  let facing = 0;
  let documentVisible = !document.hidden;

  let renderer;
  let scene;
  let camera;
  let physics;
  let playerBody;
  let playerCollider;
  let characterController;
  let character;
  let town;
  let bus;
  let input;
  let resizeObserver;
  let lowPower = false;
  let initializationStage = 'starting';

  const velocity = new THREE.Vector3();
  const playerPosition = SPAWN_POSITION.clone();
  const previousPlayerPosition = SPAWN_POSITION.clone();
  const renderPlayerPosition = SPAWN_POSITION.clone();
  const cameraTarget = new THREE.Vector3();
  const desiredCameraPosition = new THREE.Vector3();
  const raycaster = new THREE.Raycaster();
  const orbit = { yaw: Math.PI, pitch: .38, distance: 7, pointerId: null, x: 0, y: 0 };
  const eventCleanups = [];
  const originalContainerPosition = container.style.position;
  const raycastMeshes = [];

  const reportError = (error) => {
    const normalized = error instanceof Error ? error : new Error(String(error));
    try { options.onError?.(normalized); } catch (callbackError) { console.error(callbackError); }
  };
  const emit = (name, value) => {
    try { options[name]?.(value); } catch (error) { reportError(error); }
  };
  const busActive = () => Boolean(bus?.occupied || (bus && bus.state !== 'stopped'));
  const formControlFocused = () => document.activeElement instanceof HTMLElement && !document.activeElement.matches('[data-world-jump], [data-world-interact]') && (
    document.activeElement.isContentEditable || /^(INPUT|TEXTAREA|SELECT|BUTTON)$/.test(document.activeElement.tagName)
  );
  const sceneFocused = () => document.activeElement === container || container.contains(document.activeElement);
  const canOwnInput = () => initialized && mode === 'world' && !busActive() && documentVisible && sceneFocused() && !formControlFocused();
  const shouldAnimate = () => started && initialized && documentVisible && (mode === 'world' || mode === 'bus' || busActive());

  function clearInteraction() {
    nearest = null;
    if (previousNearKey) {
      previousNearKey = '';
      emit('onNearChange', null);
    }
  }

  function ensureFrame() {
    if (!disposed && shouldAnimate() && !frameId) {
      lastTime = performance.now();
      frameId = requestAnimationFrame(renderFrame);
    }
  }

  function resize() {
    if (!renderer || !camera) return;
    const width = Math.max(1, container.clientWidth);
    const height = Math.max(1, container.clientHeight);
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  }

  function setupCameraInput() {
    const canvas = renderer.domElement;
    const pointerDown = (event) => {
      if (mode !== 'world' || busActive() || orbit.pointerId !== null || event.button !== 0) return;
      container.focus({ preventScroll: true });
      orbit.pointerId = event.pointerId;
      orbit.x = event.clientX;
      orbit.y = event.clientY;
      try { canvas.setPointerCapture?.(event.pointerId); } catch { /* Pointer may already be cancelled. */ }
    };
    const pointerMove = (event) => {
      if (event.pointerId !== orbit.pointerId) return;
      const dx = event.clientX - orbit.x;
      const dy = event.clientY - orbit.y;
      orbit.x = event.clientX;
      orbit.y = event.clientY;
      orbit.yaw -= dx * .006;
      orbit.pitch = clamp(orbit.pitch + dy * .0045, .12, 1.05);
    };
    const pointerEnd = (event) => {
      if (event.pointerId === orbit.pointerId) orbit.pointerId = null;
    };
    const wheel = (event) => {
      if (mode !== 'world' || busActive()) return;
      orbit.distance = clamp(orbit.distance + event.deltaY * .008, 3.6, 10.5);
      event.preventDefault();
    };
    canvas.addEventListener('pointerdown', pointerDown);
    canvas.addEventListener('pointermove', pointerMove);
    canvas.addEventListener('pointerup', pointerEnd);
    canvas.addEventListener('pointercancel', pointerEnd);
    canvas.addEventListener('wheel', wheel, { passive: false });
    eventCleanups.push(() => {
      canvas.removeEventListener('pointerdown', pointerDown);
      canvas.removeEventListener('pointermove', pointerMove);
      canvas.removeEventListener('pointerup', pointerEnd);
      canvas.removeEventListener('pointercancel', pointerEnd);
      canvas.removeEventListener('wheel', wheel);
    });
  }

  function teleport(position) {
    playerPosition.copy(position);
    previousPlayerPosition.copy(position);
    velocity.set(0, 0, 0);
    grounded = false;
    coyoteTime = 0;
    jumpBuffer = 0;
    playerBody?.setTranslation({ x: position.x, y: position.y, z: position.z }, true);
    playerBody?.setNextKinematicTranslation({ x: position.x, y: position.y, z: position.z });
  }

  function isDisembarkClear(candidate) {
    if (!physics || !playerCollider) return true;
    let blocked = false;
    try {
      const shape = new RAPIER.Capsule(PLAYER_HALF_HEIGHT, PLAYER_RADIUS);
      physics.intersectionsWithShape(
        { x: candidate.x, y: candidate.y, z: candidate.z },
        { x: 0, y: 0, z: 0, w: 1 },
        shape,
        (collider) => {
          if (collider.handle !== playerCollider.handle) blocked = true;
          return !blocked;
        },
        undefined, undefined, playerCollider,
      );
    } catch (error) {
      reportError(new Error(`Disembark validation failed: ${error.message}`));
      return true;
    }
    return !blocked;
  }

  function disembarkAt(stop) {
    const tangent = stop.tangent;
    const side = new THREE.Vector3(tangent.z, 0, -tangent.x).normalize();
    const candidates = [
      stop.disembark.clone(),
      stop.disembark.clone().addScaledVector(tangent, 1.2),
      stop.disembark.clone().addScaledVector(tangent, -1.2),
      stop.position.clone().addScaledVector(side, -2.2).setY(PLAYER_CENTER_HEIGHT),
    ];
    const destination = candidates.find(isDisembarkClear) || new THREE.Vector3(0, PLAYER_CENTER_HEIGHT, 2.5);
    destination.y = PLAYER_CENTER_HEIGHT;
    teleport(destination);
    facing = Math.atan2(-side.x, -side.z);
  }

  function updateBus(dt) {
    if (!bus) return;
    bus.update(dt);
    if (!bus.occupied) {
      if (character) character.object.visible = true;
      return;
    }
    // Keep the player inside the coach silhouette during travel; the old head-over-roof view was distracting.
    character.object.visible = false;
    bus.seatAnchor.getWorldPosition(playerPosition);
    previousPlayerPosition.copy(playerPosition);
    playerBody.setNextKinematicTranslation(playerPosition);
    velocity.set(0, 0, 0);
    grounded = true;
  }

  function physicsStep(dt) {
    if (!playerBody || !characterController) return;
    if (bus?.occupied) {
      physics.step();
      return;
    }
    if (!canOwnInput()) return;

    previousPlayerPosition.copy(playerPosition);

    const movement = input.getMove();
    const cameraForward = new THREE.Vector3(-Math.sin(orbit.yaw), 0, -Math.cos(orbit.yaw));
    const cameraRight = new THREE.Vector3(Math.cos(orbit.yaw), 0, -Math.sin(orbit.yaw));
    const desiredDirection = cameraForward.multiplyScalar(movement.y).addScaledVector(cameraRight, movement.x);
    if (desiredDirection.lengthSq() > 1) desiredDirection.normalize();
    const desiredSpeed = input.isRunning() ? 10.5 : 6.2;
    const response = grounded ? 19 : 5;
    velocity.x = damp(velocity.x, desiredDirection.x * desiredSpeed, response, dt);
    velocity.z = damp(velocity.z, desiredDirection.z * desiredSpeed, response, dt);

    if (grounded) coyoteTime = .1;
    else coyoteTime = Math.max(0, coyoteTime - dt);
    if (input.consume('Space')) jumpBuffer = .12;
    else jumpBuffer = Math.max(0, jumpBuffer - dt);

    if (grounded && velocity.y < 0) velocity.y = -.25;
    if (jumpBuffer > 0 && coyoteTime > 0) {
      velocity.y = 6.6;
      grounded = false;
      coyoteTime = 0;
      jumpBuffer = 0;
    } else {
      velocity.y = Math.max(-16, velocity.y - 18.5 * dt);
    }
    if (desiredDirection.lengthSq() > .02) facing = Math.atan2(desiredDirection.x, desiredDirection.z);

    const desired = { x: velocity.x * dt, y: velocity.y * dt, z: velocity.z * dt };
    characterController.computeColliderMovement(playerCollider, desired);
    const corrected = characterController.computedMovement();
    wasGrounded = grounded;
    grounded = characterController.computedGrounded();
    if (grounded && !wasGrounded && velocity.y < -2.5) character.landed();
    if (grounded && corrected.y > desired.y + .001 && velocity.y < 0) velocity.y = -.25;

    const translation = playerBody.translation();
    playerPosition.set(translation.x + corrected.x, translation.y + corrected.y, translation.z + corrected.z);
    playerBody.setNextKinematicTranslation(playerPosition);
    physics.step();
    if (playerPosition.y < -8 || playerPosition.lengthSq() > 2500) teleport(SPAWN_POSITION);
  }

  function updateNearest() {
    if (!canOwnInput()) {
      clearInteraction();
      return;
    }
    let best = null;
    let bestDistance = Infinity;
    for (const item of town.interactions) {
      const distance = playerPosition.distanceTo(item.position);
      if (distance < item.radius && distance < bestDistance) {
        best = item;
        bestDistance = distance;
      }
    }
    if (bus.state === 'stopped') {
      const distance = playerPosition.distanceTo(bus.root.position);
      if (distance < 3.2 && distance < bestDistance) {
        best = { label: 'Town Bus', route: '/bus', type: 'bus' };
      }
    }
    nearest = best;
    const interactRequested = input.consume('KeyE');
    const key = best ? `${best.route}:${best.type}` : '';
    if (key !== previousNearKey) {
      previousNearKey = key;
      emit('onNearChange', best ? { label: best.label, route: best.route, type: best.type } : null);
    }
    if (best && interactRequested) {
      character.interact();
      emit('onInteract', best.route);
    }
  }

  function updateCamera(dt, targetPosition = playerPosition) {
    if (!scene || !camera) return;
    scene.updateMatrixWorld(true);
    if (bus?.occupied) {
      bus.root.getWorldPosition(cameraTarget);
      cameraTarget.y += 1.05;
      bus.cameraAnchor.getWorldPosition(desiredCameraPosition);
      const direction = desiredCameraPosition.clone().sub(cameraTarget);
      const desiredDistance = direction.length();
      direction.normalize();
      raycaster.set(cameraTarget, direction);
      raycaster.far = desiredDistance;
      const hit = raycaster.intersectObjects(raycastMeshes, false).find((entry) => entry.object?.userData?.cameraObstacle);
      const allowedDistance = hit ? Math.max(2.8, hit.distance - .4) : desiredDistance;
      actualCameraDistance = damp(actualCameraDistance || desiredDistance, allowedDistance, hit ? 20 : 4.5, dt);
      camera.position.copy(cameraTarget).addScaledVector(direction, Math.min(desiredDistance, actualCameraDistance));
      camera.up.copy(UP);
      camera.lookAt(cameraTarget);
      camera.updateMatrixWorld(true);
      return;
    }
    cameraTarget.set(targetPosition.x, targetPosition.y + .7, targetPosition.z);
    desiredCameraPosition.set(
      Math.sin(orbit.yaw) * Math.cos(orbit.pitch),
      Math.sin(orbit.pitch),
      Math.cos(orbit.yaw) * Math.cos(orbit.pitch),
    ).multiplyScalar(orbit.distance).add(cameraTarget);

    const direction = desiredCameraPosition.clone().sub(cameraTarget);
    const desiredDistance = direction.length();
    direction.normalize();
    raycaster.set(cameraTarget, direction);
    raycaster.far = desiredDistance;
    const hit = raycaster.intersectObjects(raycastMeshes, false).find((entry) => entry.object?.userData?.cameraObstacle);
    const allowedDistance = hit ? Math.max(1.25, hit.distance - .32) : desiredDistance;
    actualCameraDistance = damp(actualCameraDistance, allowedDistance, hit ? 22 : 7, dt);
    camera.position.copy(cameraTarget).addScaledVector(direction, Math.min(desiredDistance, actualCameraDistance));
    camera.lookAt(cameraTarget);
    camera.updateMatrixWorld(true);
  }

  function updateLabels() {
    if (!town || !renderer) return;
    if (mode !== 'world') {
      town.labels.forEach(({ element }) => { element.style.display = 'none'; });
      return;
    }
    const width = renderer.domElement.clientWidth;
    const height = renderer.domElement.clientHeight;
    const cameraToLabel = new THREE.Vector3();
    for (const label of town.labels) {
      const projected = label.position.clone().project(camera);
      const inView = projected.z > -1 && projected.z < 1 && Math.abs(projected.x) < 1.08 && Math.abs(projected.y) < 1.08;
      cameraToLabel.copy(label.position).sub(camera.position);
      const distance = cameraToLabel.length();
      let occluded = false;
      if (inView && distance < 38) {
        raycaster.set(camera.position, cameraToLabel.normalize());
        raycaster.far = Math.max(0, distance - .35);
        occluded = Boolean(
          raycaster.intersectObjects(raycastMeshes, false)
            .find((entry) => entry.object?.userData?.cameraObstacle),
        );
      }
      const visible = mode === 'world' && inView && distance < 38 && !occluded;
      label.element.style.display = visible ? 'block' : 'none';
      if (visible) {
        const x = (projected.x * .5 + .5) * width;
        const y = (-projected.y * .5 + .5) * height;
        label.element.style.transform = `translate(-50%, -100%) translate(${x}px, ${y}px)`;
        label.element.style.opacity = String(clamp(1 - Math.max(0, distance - 22) / 16, .25, 1));
      }
    }
  }

  function renderFrame(now) {
    frameId = 0;
    if (!shouldAnimate()) return;
    const dt = Math.min(.05, Math.max(0, (now - lastTime) / 1000));
    lastTime = now;
    frameCount += 1;
    const instantFps = dt > 0 ? 1 / dt : 60;
    averageFps = averageFps ? averageFps * .96 + instantFps * .04 : instantFps;

    updateBus(dt);
    accumulator = Math.min(accumulator + dt, FIXED_STEP * 5);
    while (accumulator >= FIXED_STEP) {
      physicsStep(FIXED_STEP);
      accumulator -= FIXED_STEP;
    }
    updateNearest();
    renderPlayerPosition.copy(previousPlayerPosition).lerp(playerPosition, accumulator / FIXED_STEP);
    const visualPosition = renderPlayerPosition.clone();
    visualPosition.y -= PLAYER_CENTER_HEIGHT;
    character.update({ position: visualPosition, velocity, grounded, dt, facing, seated: bus?.occupied });
    updateCamera(dt, renderPlayerPosition);
    labelUpdateElapsed += dt;
    if (labelUpdateElapsed >= .1) {
      updateLabels();
      labelUpdateElapsed = 0;
    }
    renderer.render(scene, camera);
    frameId = requestAnimationFrame(renderFrame);
  }

  async function initialize() {
    try {
      initializationStage = 'physics';
      await RAPIER.init();
      if (disposed) return;
      lowPower = Number(navigator.deviceMemory || 8) <= 4;
      if (getComputedStyle(container).position === 'static') container.style.position = 'relative';

      initializationStage = 'renderer';
      scene = new THREE.Scene();
      scene.background = new THREE.Color(0xa9d6d4);
      scene.fog = new THREE.FogExp2(0xa9d6d4, .014);
      camera = new THREE.PerspectiveCamera(55, 1, .08, 140);
      renderer = new THREE.WebGLRenderer({ antialias: !lowPower, powerPreference: lowPower ? 'low-power' : 'high-performance', alpha: false });
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.08;
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = lowPower ? THREE.BasicShadowMap : THREE.PCFSoftShadowMap;
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, lowPower ? 1.25 : 2));
      Object.assign(renderer.domElement.style, { display: 'block', width: '100%', height: '100%', touchAction: 'none' });
      container.prepend(renderer.domElement);

      scene.add(new THREE.HemisphereLight(0xd9f3ee, 0x5c6040, 2.25));
      const sun = new THREE.DirectionalLight(0xffe0a3, 3.1);
      sun.position.set(-15, 24, 10);
      sun.castShadow = true;
      sun.shadow.mapSize.set(lowPower ? 512 : 2048, lowPower ? 512 : 2048);
      sun.shadow.camera.left = sun.shadow.camera.bottom = -26;
      sun.shadow.camera.right = sun.shadow.camera.top = 26;
      sun.shadow.camera.near = 2;
      sun.shadow.camera.far = 65;
      sun.shadow.bias = -.00025;
      scene.add(sun);

      initializationStage = 'town';
      physics = new RAPIER.World({ x: 0, y: -18.5, z: 0 });
      physics.timestep = FIXED_STEP;
      town = createTown({ scene, physics, RAPIER, container, lowPower });
      playerBody = physics.createRigidBody(RAPIER.RigidBodyDesc.kinematicPositionBased().setTranslation(...playerPosition.toArray()));
      playerCollider = physics.createCollider(
        RAPIER.ColliderDesc.capsule(PLAYER_HALF_HEIGHT, PLAYER_RADIUS).setFriction(.2),
        playerBody,
      );
      characterController = physics.createCharacterController(.025);
      characterController.enableAutostep(.35, .2, true);
      characterController.enableSnapToGround(.22);
      characterController.setMaxSlopeClimbAngle(50 * Math.PI / 180);
      characterController.setMinSlopeSlideAngle(58 * Math.PI / 180);

      initializationStage = 'character';
      character = createCharacter();
      scene.add(character.object);
      scene.traverse((object) => {
        if (object.isMesh && object.geometry && object.userData.cameraObstacle) raycastMeshes.push(object);
      });
      initializationStage = 'bus';
      bus = createBus({
        scene,
        physics,
        RAPIER,
        curve: town.roadCurve,
        stops: town.stops,
        onState: (value) => emit('onBusState', value),
        onArrive: disembarkAt,
      });
      input = createInput(container, canOwnInput);
      setupCameraInput();

      initializationStage = 'finalizing';
      resizeObserver = new ResizeObserver(resize);
      resizeObserver.observe(container);
      resize();
      const contextLost = (event) => {
        event.preventDefault();
        reportError(new Error('WebGL context lost'));
      };
      renderer.domElement.addEventListener('webglcontextlost', contextLost);
      eventCleanups.push(() => renderer?.domElement.removeEventListener('webglcontextlost', contextLost));

      initialized = true;
      scene.updateMatrixWorld(true);
      camera.position.set(0, 4.2, 7);
      camera.lookAt(0, .9, 0);
      renderer.render(scene, camera);
      emit('onReady', {
        lowPower,
        pixelRatio: renderer.getPixelRatio(),
        fixedStep: FIXED_STEP,
        interactions: town.interactions.length,
        roadLength: town.roadCurve.getLength(),
      });
      ensureFrame();
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      api.dispose();
      throw new Error(`3D initialization failed during ${initializationStage}: ${message}`, { cause: error });
    }
  }

  const visibilityChange = () => {
    documentVisible = !document.hidden;
    input?.clear();
    if (!documentVisible && frameId) {
      cancelAnimationFrame(frameId);
      frameId = 0;
    } else ensureFrame();
  };
  document.addEventListener('visibilitychange', visibilityChange);
  eventCleanups.push(() => document.removeEventListener('visibilitychange', visibilityChange));

  const api = {
    start() {
      if (disposed) return api;
      started = true;
      if (!initializing) initializing = initialize().catch((error) => reportError(error));
      else ensureFrame();
      return api;
    },
    setMode(nextMode) {
      if (disposed) return api;
      mode = String(nextMode || 'world');
      orbit.pointerId = null;
      input?.clear();
      clearInteraction();
      if (!shouldAnimate() && frameId) {
        cancelAnimationFrame(frameId);
        frameId = 0;
      } else ensureFrame();
      return api;
    },
    returnToCourtyard() {
      if (disposed) return false;
      if (busActive()) bus?.skip();
      mode = 'world';
      teleport(SPAWN_POSITION);
      input?.clear();
      ensureFrame();
      return true;
    },
    travelBus(route) {
      if (disposed || !initialized || bus.state !== 'stopped' || playerPosition.distanceTo(bus.root.position) > 3.4) return false;
      const accepted = bus.travel(route);
      if (accepted) {
        input.clear();
        clearInteraction();
        ensureFrame();
      }
      return accepted;
    },
    skipBus() {
      if (disposed || !busActive()) return false;
      return bus.skip();
    },
    dispose() {
      if (disposed) return;
      disposed = true;
      started = false;
      if (frameId) cancelAnimationFrame(frameId);
      frameId = 0;
      input?.dispose();
      resizeObserver?.disconnect();
      eventCleanups.splice(0).forEach((cleanup) => cleanup());
      town?.labels.forEach(({ element }) => element.remove());
      bus?.dispose();
      if (scene) disposeObject(scene);
      characterController?.free?.();
      physics?.free?.();
      renderer?.dispose();
      renderer?.forceContextLoss?.();
      renderer?.domElement.remove();
      container.style.position = originalContainerPosition;
      clearInteraction();
    },
    getDebugState() {
      return {
        mode,
        ready: initialized,
        playerPosition: { x: playerPosition.x, y: playerPosition.y, z: playerPosition.z },
        velocity: { x: velocity.x, y: velocity.y, z: velocity.z },
        grounded,
        animation: character?.animation || 'uninitialized',
        cameraDistance: actualCameraDistance,
        nearestRoute: nearest?.route || null,
        busState: bus?.state || 'uninitialized',
        busOccupied: Boolean(bus?.occupied),
        busRouteProgress: bus?.progress ?? 0,
        busDistance: bus ? Number(playerPosition.distanceTo(bus.root.position).toFixed(2)) : null,
        busPosition: bus ? { x: bus.root.position.x, z: bus.root.position.z } : null,
        frameCount,
        averageFps: Number(averageFps.toFixed(1)),
      };
    },
  };

  return api;
}

export default createWorld;
