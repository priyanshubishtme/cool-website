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

export function createBus({ scene, curve, stops, onState, onArrive }) {
  const root = new THREE.Group();
  root.name = 'foothill-loop-bus';
  scene.add(root);
  const teal = material(0x197c7a);
  const amber = material(0xf1b746);
  const dark = material(0x263638);
  const glass = material(0x8fc9cc, { transparent: true, opacity: .72, metalness: .12, roughness: .2 });

  part(root, new THREE.BoxGeometry(2.25, 1.15, 4.4), teal, [0, 1.05, 0]);
  part(root, new THREE.BoxGeometry(2.28, .28, 4.45), amber, [0, 1.45, 0]);
  part(root, new THREE.BoxGeometry(2.12, .82, 3.7), glass, [0, 1.95, -.05]);
  part(root, new THREE.BoxGeometry(2.2, .18, 4.25), amber, [0, 2.45, 0]);
  part(root, new THREE.BoxGeometry(1.7, .5, .09), glass, [0, 1.96, 2.18]);
  part(root, new THREE.BoxGeometry(.75, .92, .08), dark, [.56, .92, 2.22]);
  part(root, new THREE.BoxGeometry(.7, .2, .08), amber, [-.65, .75, 2.23]);

  const wheels = [];
  for (const x of [-1.12, 1.12]) for (const z of [-1.42, 1.42]) {
    const wheel = part(root, new THREE.CylinderGeometry(.43, .43, .23, 16), dark, [x, .53, z]);
    wheel.rotation.z = Math.PI / 2;
    wheels.push(wheel);
  }
  const sign = part(root, new THREE.BoxGeometry(1.55, .32, .08), dark, [0, 2.28, 2.23]);
  const seatAnchor = new THREE.Object3D();
  seatAnchor.position.set(.45, 1.75, .35);
  root.add(seatAnchor);
  const cameraAnchor = new THREE.Object3D();
  cameraAnchor.position.set(0, 3.3, -6.4);
  root.add(cameraAnchor);

  const routes = [...stops.keys()];
  let currentRoute = routes[0];
  let targetRoute = null;
  let state = 'stopped';
  let timer = 0;
  let progress = stops.get(currentRoute).progress;
  let distanceTravelled = 0;
  let targetDistance = 0;
  let occupied = false;
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
    curve.getPointAt((progress + .0025) % 1, lookPoint);
    root.position.copy(point);
    root.position.y += .08;
    root.rotation.y = Math.atan2(lookPoint.x - point.x, lookPoint.z - point.z);
  }

  function setState(next) {
    if (state === next) return;
    state = next;
    timer = 0;
    onState?.({ state, label: stops.get(targetRoute || currentRoute).label });
  }

  function advance(distance) {
    distanceTravelled += distance;
    progress = (progress + distance / length) % 1;
    wheels.forEach((wheel) => { wheel.rotation.x -= distance / .43; });
  }

  function arriveImmediately() {
    if (!targetRoute) return false;
    progress = stops.get(targetRoute).progress;
    currentRoute = targetRoute;
    targetRoute = null;
    place();
    setState('stopped');
    occupied = false;
    updateSign();
    onArrive?.(stops.get(currentRoute));
    return true;
  }

  updateSign();
  place();
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
        if (state === 'driving' && remaining < 4.2) setState('arriving');
        const speed = state === 'arriving' ? Math.max(1.25, remaining * 1.25) : 6.4;
        const distance = Math.min(remaining, speed * dt);
        advance(distance);
        if (remaining <= .035 || distanceTravelled >= targetDistance - .035) {
          progress = stops.get(targetRoute).progress;
          place();
          currentRoute = targetRoute;
          targetRoute = null;
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
      if (state !== 'stopped' || occupied || !stops.has(route) || route === currentRoute) return false;
      targetRoute = route;
      occupied = true;
      distanceTravelled = 0;
      targetDistance = ((stops.get(route).progress - progress + 1) % 1) * length;
      if (targetDistance < .2) targetDistance = length;
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
    dispose() { signTexture.dispose(); },
  };
}
