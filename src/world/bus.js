import * as THREE from 'three';

function material(color, extras = {}) {
  return new THREE.MeshStandardMaterial({ color, roughness: .68, ...extras });
}

function part(parent, geometry, mat, position) {
  const mesh = new THREE.Mesh(geometry, mat);
  mesh.position.set(...position);
  mesh.castShadow = mesh.receiveShadow = true;
  parent.add(mesh);
  return mesh;
}

export function createBus({ scene, physics, RAPIER, curve, stops, onState, onArrive }) {
  const root = new THREE.Group();
  root.name = 'foothill-loop-bus';
  root.scale.setScalar(.8);
  scene.add(root);
  const teal = material(0x197c7a);
  const amber = material(0xf1b746);
  const dark = material(0x263638);
  const glass = material(0x8fc9cc, { transparent: true, opacity: .72, metalness: .12, roughness: .2 });

  // Rounded coach body with clear lower trim, roof cap, and a readable front face.
  part(root, new THREE.BoxGeometry(2.3, 1.32, 4.5), teal, [0, 1.13, 0]);
  part(root, new THREE.BoxGeometry(2.34, .25, 4.56), amber, [0, .62, 0]);
  part(root, new THREE.BoxGeometry(2.24, .16, 4.42), dark, [0, 1.86, 0]);
  part(root, new THREE.BoxGeometry(1.76, .59, .08), glass, [0, 1.5, 2.29]);
  part(root, new THREE.BoxGeometry(1.78, .5, .08), glass, [0, 1.53, -2.29]);
  // Passenger windows are separated by visible body pillars on both sides.
  for (const side of [-1, 1]) for (const z of [-1.45, -.48, .49]) {
    part(root, new THREE.BoxGeometry(.07, .53, .79), dark, [side * 1.16, 1.53, z]);
    part(root, new THREE.BoxGeometry(.035, .46, .69), glass, [side * 1.205, 1.55, z]);
  }
  part(root, new THREE.BoxGeometry(.73, .88, .075), dark, [.68, 1.08, 2.31]);
  part(root, new THREE.BoxGeometry(.63, .72, .035), teal, [.68, 1.1, 2.36]);
  part(root, new THREE.BoxGeometry(.42, .1, .07), amber, [-.63, .87, 2.34]);
  part(root, new THREE.BoxGeometry(.4, .09, .07), amber, [.22, .87, 2.34]);
  part(root, new THREE.BoxGeometry(.46, .08, .1), dark, [0, .94, 2.34]);
  for (const x of [-.77, .77]) {
    part(root, new THREE.BoxGeometry(.24, .18, .09), material(0xffe5a0, { emissive: 0x59441d }), [x, 1.12, 2.34]);
    part(root, new THREE.BoxGeometry(.13, .16, .18), dark, [x * 1.52, 1.69, 1.9]);
    part(root, new THREE.BoxGeometry(.18, .13, .22), glass, [x * 1.52, 1.77, 1.9]);
  }

  const wheels = [];
  for (const x of [-1.14, 1.14]) for (const z of [-1.42, 1.42]) {
    const wheel = part(root, new THREE.CylinderGeometry(.39, .39, .25, 20), dark, [x, .51, z]);
    wheel.rotation.z = Math.PI / 2;
    const hub = part(root, new THREE.CylinderGeometry(.2, .2, .26, 16), material(0xb6a36d), [x * 1.01, .51, z]);
    hub.rotation.z = Math.PI / 2;
    wheels.push(wheel);
  }
  const sign = part(root, new THREE.BoxGeometry(1.42, .28, .08), dark, [0, 2.02, 2.31]);
  const seatAnchor = new THREE.Object3D();
  seatAnchor.position.set(.45, 1.35, .35);
  root.add(seatAnchor);
  const cameraAnchor = new THREE.Object3D();
  cameraAnchor.position.set(0, 4.5, -8.8);
  root.add(cameraAnchor);

  const routes = [...stops.keys()];
  let currentRoute = routes[0];
  let targetRoute = null;
  let state = 'stopped';
  let timer = 0;
  let progress = stops.get(currentRoute).progress;
  let distanceTravelled = 0;
  let targetDistance = 0;
  let direction = 1;
  let speed = 0;
  let occupied = false;
  let physicsBody = null;
  const length = curve.getLength();
  const point = new THREE.Vector3();
  const lookPoint = new THREE.Vector3();
  const signCanvas = document.createElement('canvas');
  signCanvas.width = 256; signCanvas.height = 64;
  const signContext = signCanvas.getContext('2d');
  const signTexture = new THREE.CanvasTexture(signCanvas);
  signTexture.colorSpace = THREE.SRGBColorSpace;
  sign.material = new THREE.MeshBasicMaterial({ map: signTexture });

  function updateSign() {
    signContext.fillStyle = '#253739'; signContext.fillRect(0, 0, 256, 64);
    signContext.fillStyle = '#ffd16a'; signContext.font = 'bold 28px system-ui';
    signContext.textAlign = 'center'; signContext.textBaseline = 'middle';
    const label = targetRoute ? stops.get(targetRoute).label : stops.get(currentRoute).label;
    signContext.fillText(label.toUpperCase().slice(0, 18), 128, 33);
    signTexture.needsUpdate = true;
  }

  function place() {
    curve.getPointAt((progress % 1 + 1) % 1, point);
    curve.getPointAt((progress + direction * .0025 + 1) % 1, lookPoint);
    root.position.copy(point);
    root.position.y += .08;
    root.rotation.y = Math.atan2(lookPoint.x - point.x, lookPoint.z - point.z);
    if (physicsBody) {
      physicsBody.setNextKinematicTranslation(root.position);
      physicsBody.setNextKinematicRotation(root.quaternion);
    }
  }

  function setState(next) {
    if (state === next) return;
    state = next;
    timer = 0;
    onState?.({ state, label: stops.get(targetRoute || currentRoute).label });
  }

  function advance(distance) {
    distanceTravelled += distance;
    progress = (progress + direction * distance / length + 1) % 1;
    wheels.forEach((wheel) => { wheel.rotation.x -= direction * distance / .39; });
  }

  function arriveImmediately() {
    if (!targetRoute) return false;
    progress = stops.get(targetRoute).progress;
    currentRoute = targetRoute;
    targetRoute = null;
    speed = 0;
    place();
    setState('stopped');
    occupied = false;
    updateSign();
    onArrive?.(stops.get(currentRoute));
    return true;
  }

  updateSign();
  place();
  if (physics && RAPIER) {
    const body = RAPIER.RigidBodyDesc.kinematicPositionBased()
      .setTranslation(root.position.x, root.position.y, root.position.z)
      .setRotation(root.quaternion);
    physicsBody = physics.createRigidBody(body);
    physics.createCollider(
      RAPIER.ColliderDesc.cuboid(.94, .54, 1.82).setTranslation(0, .9, 0).setFriction(.75),
      physicsBody,
    );
  }
  onState?.({ state, label: stops.get(currentRoute).label });

  return {
    root,
    seatAnchor,
    cameraAnchor,
    update(dt) {
      timer += dt;
      if (state === 'boarding' && timer >= .75) setState('departing');
      else if (state === 'departing') {
        if (timer >= .65) setState('driving');
      } else if (state === 'driving' || state === 'arriving') {
        const remaining = Math.max(0, targetDistance - distanceTravelled);
        if (state === 'driving' && remaining < 10) setState('arriving');
        const targetSpeed = state === 'arriving' ? Math.sqrt(2 * 5.2 * remaining) : 8.2;
        speed += (targetSpeed - speed) * (1 - Math.exp(-3.4 * dt));
        const distance = Math.min(remaining, speed * dt);
        advance(distance);
        if (remaining <= .035 || distanceTravelled >= targetDistance - .035) {
          progress = stops.get(targetRoute).progress;
          place();
          currentRoute = targetRoute;
          targetRoute = null;
          speed = 0;
          occupied = false;
          setState('stopped');
          updateSign();
          onArrive?.(stops.get(currentRoute));
          return;
        }
      }
      place();
    },
    travel(route) {
      if (state !== 'stopped' || !stops.has(route) || route === currentRoute) return false;
      targetRoute = route;
      occupied = true;
      distanceTravelled = 0;
      const forward = (stops.get(route).progress - progress + 1) % 1;
      const backward = (progress - stops.get(route).progress + 1) % 1;
      direction = forward <= backward ? 1 : -1;
      targetDistance = Math.min(forward, backward) * length;
      speed = 0;
      updateSign();
      setState('boarding');
      return true;
    },
    skip: arriveImmediately,
    get state() { return state; },
    get progress() { return progress; },
    get occupied() { return occupied; },
    get currentStop() { return stops.get(currentRoute); },
    get targetStop() { return targetRoute ? stops.get(targetRoute) : null; },
    dispose() {
      signTexture.dispose();
      if (physicsBody) physics.removeRigidBody(physicsBody);
    },
  };
}
