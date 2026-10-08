import * as THREE from 'three';
import { damp, dampAngle } from './utils.js';

const skin = new THREE.MeshStandardMaterial({ color: 0xc98258, roughness: 0.82 });
const shirt = new THREE.MeshStandardMaterial({ color: 0x197a78, roughness: 0.78 });
const trousers = new THREE.MeshStandardMaterial({ color: 0x263d52, roughness: 0.9 });
const amber = new THREE.MeshStandardMaterial({ color: 0xf4b94a, roughness: 0.72 });
const dark = new THREE.MeshStandardMaterial({ color: 0x27231f, roughness: 0.92 });

function mesh(geometry, material, parent, position = [0, 0, 0]) {
  const object = new THREE.Mesh(geometry, material);
  object.position.set(...position);
  object.castShadow = object.receiveShadow = true;
  parent.add(object);
  return object;
}

function limb(parent, material, length, radius, x) {
  const pivot = new THREE.Group();
  pivot.position.set(x, 0, 0);
  parent.add(pivot);
  const part = mesh(new THREE.CapsuleGeometry(radius, length - radius * 2, 4, 8), material, pivot, [0, -length / 2, 0]);
  return { pivot, part };
}

export function createCharacter() {
  const root = new THREE.Group();
  root.name = 'procedural-character';
  const body = new THREE.Group();
  body.position.y = 1.18;
  root.add(body);

  mesh(new THREE.CapsuleGeometry(0.27, 0.45, 5, 10), shirt, body, [0, 0.15, 0]);
  mesh(new THREE.SphereGeometry(0.24, 16, 12), skin, body, [0, 0.74, 0]);
  mesh(new THREE.SphereGeometry(0.245, 14, 8, 0, Math.PI * 2, 0, Math.PI * 0.46), dark, body, [0, 0.79, -0.015]);
  mesh(new THREE.BoxGeometry(0.11, 0.035, 0.045), dark, body, [-0.1, 0.75, 0.225]);
  mesh(new THREE.BoxGeometry(0.11, 0.035, 0.045), dark, body, [0.1, 0.75, 0.225]);
  const satchel = mesh(new THREE.BoxGeometry(0.4, 0.32, 0.12), amber, body, [0, 0.08, -0.3]);
  satchel.rotation.x = -0.08;

  const leftArm = limb(body, skin, 0.62, 0.085, -0.34);
  const rightArm = limb(body, skin, 0.62, 0.085, 0.34);
  leftArm.pivot.position.y = rightArm.pivot.position.y = 0.38;
  const leftLeg = limb(body, trousers, 0.72, 0.105, -0.15);
  const rightLeg = limb(body, trousers, 0.72, 0.105, 0.15);
  leftLeg.pivot.position.y = rightLeg.pivot.position.y = -0.18;
  mesh(new THREE.BoxGeometry(0.2, 0.12, 0.34), dark, leftLeg.pivot, [0, -0.68, 0.08]);
  mesh(new THREE.BoxGeometry(0.2, 0.12, 0.34), dark, rightLeg.pivot, [0, -0.68, 0.08]);

  let animation = 'idle';
  let previousAnimation = 'idle';
  let animationTime = 0;
  let landTime = 0;
  let interactTime = 0;

  function setPose(state, horizontalSpeed, grounded, verticalSpeed, dt, seated = false) {
    previousAnimation = animation;
    if (seated) animation = 'seated';
    else if (interactTime > 0) animation = 'interact';
    else if (!grounded) animation = verticalSpeed > 0.2 ? 'jump' : 'fall';
    else if (landTime > 0) animation = 'land';
    else if (horizontalSpeed > 4.2) animation = 'run';
    else if (horizontalSpeed > 0.18) animation = 'walk';
    else animation = 'idle';
    if (previousAnimation !== animation) animationTime = 0;
    animationTime += dt;
    landTime = Math.max(0, landTime - dt);
    interactTime = Math.max(0, interactTime - dt);

    const frequency = animation === 'run' ? 12 : animation === 'walk' ? 7 : 2.2;
    const amplitude = animation === 'run' ? 0.85 : animation === 'walk' ? 0.55 : 0.035;
    const swing = Math.sin(animationTime * frequency) * amplitude;
    let armL = swing, armR = -swing, legL = -swing, legR = swing;
    let bodyY = 1.18 + Math.abs(Math.sin(animationTime * frequency)) * (animation === 'idle' ? 0.015 : 0.035);
    let bodyX = 0;

    if (animation === 'jump') { armL = armR = -0.45; legL = -0.28; legR = 0.28; }
    if (animation === 'fall') { armL = 0.65; armR = -0.65; legL = legR = 0.12; }
    if (animation === 'land') { armL = armR = 0.35; legL = legR = -0.4; bodyY -= 0.16; }
    if (animation === 'interact') { armR = -1.6 + Math.sin(animationTime * 14) * 0.2; armL = 0.1; legL = legR = 0; }
    if (animation === 'seated') { armL = armR = -0.15; legL = legR = -1.4; bodyY = 1.0; bodyX = -0.08; }

    const smoothing = 15;
    leftArm.pivot.rotation.x = damp(leftArm.pivot.rotation.x, armL, smoothing, dt);
    rightArm.pivot.rotation.x = damp(rightArm.pivot.rotation.x, armR, smoothing, dt);
    leftLeg.pivot.rotation.x = damp(leftLeg.pivot.rotation.x, legL, smoothing, dt);
    rightLeg.pivot.rotation.x = damp(rightLeg.pivot.rotation.x, legR, smoothing, dt);
    body.position.y = damp(body.position.y, bodyY, 18, dt);
    body.rotation.x = damp(body.rotation.x, bodyX, 12, dt);
  }

  return {
    object: root,
    update({ position, velocity, grounded, dt, facing, seated }) {
      root.position.copy(position);
      root.rotation.y = dampAngle(root.rotation.y, facing, 13, dt);
      const speed = Math.hypot(velocity.x, velocity.z);
      setPose(animation, speed, grounded, velocity.y, dt, seated);
    },
    landed() { landTime = 0.16; },
    interact() { interactTime = 0.48; },
    get animation() { return animation; },
  };
}
