import * as THREE from 'three';
import { damp, dampAngle } from './utils.js';

const skin = new THREE.MeshStandardMaterial({ color: 0xc98258, roughness: 0.82 });
const shirt = new THREE.MeshStandardMaterial({ color: 0x20242d, roughness: 0.88 });
const trousers = new THREE.MeshStandardMaterial({ color: 0x263d52, roughness: 0.9 });
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
  mesh(new THREE.SphereGeometry(0.245, 18, 10, 0, Math.PI * 2, 0, Math.PI * 0.46), dark, body, [0, 0.79, -0.015]);
  const fringe = mesh(new THREE.SphereGeometry(0.25, 14, 8, 0, Math.PI * 1.15, 0, Math.PI * 0.38), dark, body, [-0.035, 0.91, 0.015]);
  fringe.rotation.z = -0.22;
  mesh(new THREE.CapsuleGeometry(0.07, 0.13, 4, 8), dark, body, [-0.19, 0.79, 0.04]).rotation.z = -0.25;
  mesh(new THREE.BoxGeometry(0.17, 0.035, 0.028), dark, body, [0, 0.67, 0.232]);
  const eyeWhite = new THREE.MeshStandardMaterial({ color: 0xf0dfc6, roughness: 0.72 });
  mesh(new THREE.SphereGeometry(0.024, 8, 6), eyeWhite, body, [-0.083, 0.77, 0.224]);
  mesh(new THREE.SphereGeometry(0.024, 8, 6), eyeWhite, body, [0.083, 0.77, 0.224]);
  mesh(new THREE.SphereGeometry(0.012, 8, 6), dark, body, [-0.083, 0.77, 0.245]);
  mesh(new THREE.SphereGeometry(0.012, 8, 6), dark, body, [0.083, 0.77, 0.245]);
  mesh(new THREE.SphereGeometry(0.035, 8, 6), skin, body, [0, 0.71, 0.236]);
  mesh(new THREE.BoxGeometry(0.3, 0.15, 0.035), dark, body, [0, -0.02, 0.244]);
  mesh(new THREE.CylinderGeometry(0.009, 0.009, 0.18, 6), skin, body, [-0.07, 0.27, 0.235]);
  mesh(new THREE.CylinderGeometry(0.009, 0.009, 0.18, 6), skin, body, [0.07, 0.27, 0.235]);

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

    leftArm.pivot.rotation.x = damp(leftArm.pivot.rotation.x, armL, 15, dt);
    rightArm.pivot.rotation.x = damp(rightArm.pivot.rotation.x, armR, 15, dt);
    leftLeg.pivot.rotation.x = damp(leftLeg.pivot.rotation.x, legL, 15, dt);
    rightLeg.pivot.rotation.x = damp(rightLeg.pivot.rotation.x, legR, 15, dt);
    body.position.y = damp(body.position.y, bodyY, 18, dt);
    body.rotation.x = damp(body.rotation.x, bodyX, 12, dt);
  }

  return {
    object: root,
    update({ position, velocity, grounded, dt, facing, seated }) {
      root.position.copy(position);
      root.rotation.y = dampAngle(root.rotation.y, facing, 13, dt);
      setPose(animation, Math.hypot(velocity.x, velocity.z), grounded, velocity.y, dt, seated);
    },
    landed() { landTime = 0.16; },
    interact() { interactTime = 0.48; },
    get animation() { return animation; },
  };
}
