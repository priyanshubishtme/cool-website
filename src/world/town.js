import * as THREE from 'three';
import { createLabel, makeCanvasTexture, roundedBox } from './utils.js';

const BUILDINGS = [
  { label: 'Workshop', route: '/projects', type: 'workshop', position: [-8.5, -6], color: 0xc96f4b, roof: 0x315f63 },
  { label: 'Library', route: '/books', type: 'library', position: [0, -10], color: 0xd6a75d, roof: 0x72413a },
  { label: 'Story Garden', route: '/about', type: 'garden', position: [9, -6], color: 0x8cae75, roof: 0x375f49 },
  { label: 'Learning Station', route: '/education', type: 'station', position: [9, 5.5], color: 0x4e8fa1, roof: 0xd3983b },
  { label: 'Trophy Pavilion', route: '/achievements', type: 'trophy', position: [0, 9.5], color: 0xe1bd65, roof: 0x704e34 },
  { label: 'Post Office', route: '/contact', type: 'post', position: [-9, 5.5], color: 0xb96b65, roof: 0x315f63 },
];

function standard(color, extras = {}) {
  return new THREE.MeshStandardMaterial({ color, roughness: 0.82, ...extras });
}

function addMesh(parent, geometry, material, position, shadows = true) {
  const object = new THREE.Mesh(geometry, material);
  if (position) object.position.set(...position);
  object.castShadow = shadows;
  object.receiveShadow = shadows;
  parent.add(object);
  return object;
}

function createRibbonGeometry(curve, width, segments) {
  const positions = [];
  const uvs = [];
  const indices = [];
  for (let i = 0; i <= segments; i++) {
    const u = i / segments;
    const point = curve.getPointAt(u);
    const tangent = curve.getTangentAt(u).normalize();
    const side = new THREE.Vector3(tangent.z, 0, -tangent.x).normalize().multiplyScalar(width / 2);
    positions.push(
      point.x + side.x, point.y, point.z + side.z,
      point.x - side.x, point.y, point.z - side.z,
    );
    uvs.push(0, u, 1, u);
    if (i < segments) {
      const a = i * 2;
      indices.push(a, a + 2, a + 1, a + 2, a + 3, a + 1);
    }
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geometry.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
  return geometry;
}

function markObstacle(object) {
  object.traverse((child) => {
    if (child.isMesh) child.userData.cameraObstacle = true;
  });
}

function addFixedBox(physics, RAPIER, position, halfExtents, rotation = null) {
  const bodyDesc = RAPIER.RigidBodyDesc.fixed().setTranslation(...position);
  if (rotation) bodyDesc.setRotation(rotation);
  const body = physics.createRigidBody(bodyDesc);
  physics.createCollider(RAPIER.ColliderDesc.cuboid(...halfExtents).setFriction(0.9), body);
  return body;
}

function createBuilding(definition, physics, RAPIER) {
  const group = new THREE.Group();
  const [x, z] = definition.position;
  group.position.set(x, 0, z);
  const width = definition.type === 'station' ? 4.4 : 3.5;
  const depth = definition.type === 'garden' ? 3.8 : 3.1;
  const height = definition.type === 'trophy' ? 2.5 : 2.9;

  if (definition.type === 'garden') {
    const hedgeMaterial = standard(0x547a48);
    for (const [hx, hz, sx, sz] of [[0, -1.7, 3.8, .35], [-1.75, 0, .35, 3.4], [1.75, 0, .35, 3.4]]) {
      addMesh(group, new THREE.BoxGeometry(sx, 1.05, sz), hedgeMaterial, [hx, .52, hz]);
    }
    addMesh(group, new THREE.CylinderGeometry(1.15, 1.3, .28, 16), standard(0xd0b477), [0, .14, 0]);
    const arch = addMesh(group, new THREE.TorusGeometry(1.05, .13, 8, 16, Math.PI), standard(0x805d3b), [0, 1.05, 1.48]);
    arch.rotation.z = Math.PI;
    addFixedBox(physics, RAPIER, [x - 1.75, .52, z], [.18, .52, 1.7]);
    addFixedBox(physics, RAPIER, [x + 1.75, .52, z], [.18, .52, 1.7]);
    addFixedBox(physics, RAPIER, [x, .52, z - 1.7], [1.9, .52, .18]);
  } else {
    const base = addMesh(group, roundedBox(width, height, depth, .16), standard(definition.color), [0, height / 2, 0]);
    const roof = addMesh(group, new THREE.ConeGeometry(Math.max(width, depth) * .73, 1.45, definition.type === 'station' ? 4 : 6), standard(definition.roof), [0, height + .62, 0]);
    roof.rotation.y = definition.type === 'station' ? Math.PI / 4 : 0;
    const door = addMesh(group, roundedBox(.75, 1.5, .12, .08), standard(0x563b2f), [0, .75, depth / 2 + .04]);
    for (const wx of [-width * .3, width * .3]) {
      addMesh(group, new THREE.BoxGeometry(.58, .62, .1), standard(0xa9dbe0, { emissive: 0x274b52, emissiveIntensity: .25 }), [wx, 1.75, depth / 2 + .07]);
    }
    if (definition.type === 'post') {
      const sign = addMesh(group, new THREE.BoxGeometry(1.1, .6, .14), standard(0xf3dfac), [0, 2.45, depth / 2 + .13]);
      const flap = addMesh(group, new THREE.BoxGeometry(.55, .08, .17), standard(0x9a5147), [0, 2.45, depth / 2 + .23]);
      sign.add(flap);
    }
    if (definition.type === 'library') {
      for (let i = -1; i <= 1; i++) addMesh(group, new THREE.BoxGeometry(.18, .62, .18), standard([0x9c4f45, 0x477c72, 0xd2a447][i + 1]), [i * .25, 2.5, depth / 2 + .15]);
    }
    if (definition.type === 'trophy') {
      const cup = addMesh(group, new THREE.CylinderGeometry(.22, .14, .48, 12), standard(0xf1c95b, { metalness: .45 }), [0, height + 1.35, 0]);
      addMesh(cup, new THREE.TorusGeometry(.24, .055, 6, 12, Math.PI), cup.material, [-.18, .06, 0]).rotation.z = Math.PI / 2;
    }
    addFixedBox(physics, RAPIER, [x, height / 2, z], [width / 2, height / 2, depth / 2]);
  }
  markObstacle(group);
  return { group, width, depth, height };
}

function createTree(x, z, scale = 1) {
  const group = new THREE.Group();
  group.position.set(x, 0, z);
  const trunk = addMesh(group, new THREE.CylinderGeometry(.16 * scale, .23 * scale, 1.5 * scale, 7), standard(0x79553a), [0, .75 * scale, 0]);
  const crown = addMesh(group, new THREE.ConeGeometry(.9 * scale, 2.3 * scale, 8), standard(0x416f4d), [0, 2.05 * scale, 0]);
  crown.rotation.y = x * .31 + z;
  markObstacle(group);
  return group;
}

export function createTown({ scene, physics, RAPIER, container, lowPower }) {
  const root = new THREE.Group();
  root.name = 'foothill-town';
  scene.add(root);

  const groundTexture = makeCanvasTexture((context, size) => {
    context.fillStyle = '#86a86f'; context.fillRect(0, 0, size, size);
    for (let i = 0; i < 650; i++) {
      context.fillStyle = i % 3 ? 'rgba(49,91,58,.08)' : 'rgba(238,211,133,.08)';
      context.fillRect(Math.random() * size, Math.random() * size, 2, 2);
    }
  });
  groundTexture.wrapS = groundTexture.wrapT = THREE.RepeatWrapping;
  groundTexture.repeat.set(18, 18);
  groundTexture.anisotropy = lowPower ? 1 : 4;
  const ground = addMesh(root, new THREE.CircleGeometry(34, lowPower ? 48 : 96), standard(0x86a86f, { map: groundTexture }), [0, -.035, 0]);
  ground.rotation.x = -Math.PI / 2;
  ground.receiveShadow = true;
  ground.castShadow = false;
  ground.userData.cameraObstacle = false;
  addFixedBox(physics, RAPIER, [0, -.55, 0], [34, .5, 34]);

  const roadCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(3.2, .035, 3), new THREE.Vector3(-12.5, .035, -7.5),
    new THREE.Vector3(0, .035, -14), new THREE.Vector3(12.5, .035, -7.5),
    new THREE.Vector3(13.5, .035, 7), new THREE.Vector3(0, .035, 14),
    new THREE.Vector3(-13.5, .035, 7),
  ], true, 'catmullrom', .22);
  const road = addMesh(root, createRibbonGeometry(roadCurve, 2.1, lowPower ? 90 : 180), standard(0xb39873), null);
  road.castShadow = false;
  road.receiveShadow = true;
  const centerLine = addMesh(root, new THREE.TubeGeometry(roadCurve, 160, .055, 5, true), standard(0xf3d278), [0, .035, 0]);
  centerLine.castShadow = false;

  const waterCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-20, .04, -15), new THREE.Vector3(-12, .04, -5),
    new THREE.Vector3(-5, .04, 2), new THREE.Vector3(-2, .04, 15), new THREE.Vector3(-5, .04, 25),
  ]);
  const water = addMesh(root, createRibbonGeometry(waterCurve, 2.2, 70), standard(0x4f9da3, { transparent: true, opacity: .76, metalness: .08, roughness: .25, side: THREE.DoubleSide }), null, false);
  water.userData.cameraObstacle = false;
  for (const z of [-1.5, -.75, 0, .75, 1.5]) addMesh(root, new THREE.BoxGeometry(.62, .14, 1.15), standard(0x806344), [-4.55, .16, z]);

  const interactions = [];
  const labels = [];
  BUILDINGS.forEach((definition) => {
    const created = createBuilding(definition, physics, RAPIER);
    root.add(created.group);
    const [x, z] = definition.position;
    const anchor = new THREE.Vector3(x, definition.type === 'garden' ? 2.2 : created.height + 1.65, z);
    const interactionPosition = new THREE.Vector3(x, .9, z + created.depth / 2 + 1.05);
    interactions.push({ ...definition, position: interactionPosition, radius: 2.65 });
    labels.push({ element: createLabel(container, definition.label), position: anchor, route: definition.route });
  });

  const pathMaterial = standard(0xd4bb82);
  BUILDINGS.forEach(({ position: [x, z] }) => {
    const length = Math.max(2, Math.hypot(x, z) - 2.2);
    const path = addMesh(root, new THREE.BoxGeometry(1.05, .045, length), pathMaterial, [x * .47, .015, z * .47], false);
    path.rotation.y = Math.atan2(x, z);
  });

  const treePositions = [
    [-16,-11,1.2],[-18,-4,.9],[-17,5,1.1],[-15,12,.9],[-9,15,1.2],[-5,18,1],
    [6,18,1.2],[12,15,.9],[17,11,1.15],[18,3,.9],[18,-5,1.2],[16,-13,1],
    [8,-17,1.15],[-7,-18,1],[-12,-15,.8],[5,5,.65],[-5,7,.62],[5,-2,.58],
  ];
  treePositions.forEach(([x, z, scale]) => {
    root.add(createTree(x, z, scale));
    addFixedBox(physics, RAPIER, [x, .75 * scale, z], [.22 * scale, .75 * scale, .22 * scale]);
  });

  const mountainMaterial = standard(0x65775f);
  for (let i = 0; i < 13; i++) {
    const angle = (i / 13) * Math.PI * 2;
    const distance = 42 + (i % 3) * 3;
    const height = 12 + (i * 7 % 9);
    const mountain = addMesh(root, new THREE.ConeGeometry(8 + i % 4, height, 6), mountainMaterial, [Math.sin(angle) * distance, height / 2 - .5, Math.cos(angle) * distance]);
    mountain.userData.cameraObstacle = false;
    const snow = addMesh(mountain, new THREE.ConeGeometry(3.2 + i % 2, 3.4, 6), standard(0xe8e4d2), [0, height / 2 - 1.9, 0]);
    snow.userData.cameraObstacle = false;
  }

  const stops = new Map();
  const courtyardPosition = roadCurve.getPointAt(0);
  const courtyardTangent = roadCurve.getTangentAt(0).normalize();
  stops.set('/courtyard', {
    route: '/courtyard', label: 'Central Courtyard', progress: 0,
    position: courtyardPosition, tangent: courtyardTangent,
    disembark: new THREE.Vector3(1.4, .92, 1.4),
  });
  const terraceMaterial = standard(0xb89d72);
  for (let index = 0; index < 3; index += 1) {
    const height = .12 + index * .12;
    addMesh(root, new THREE.BoxGeometry(2.2, height, .72), terraceMaterial, [4.4, height / 2, .4 + index * .7]);
    addFixedBox(physics, RAPIER, [4.4, height / 2, .4 + index * .7], [1.1, height / 2, .36]);
  }

  // Invisible conservative bounds keep the capsule on the authored terrain.
  addFixedBox(physics, RAPIER, [0, 2, -33], [33, 2, .35]);
  addFixedBox(physics, RAPIER, [0, 2, 33], [33, 2, .35]);
  addFixedBox(physics, RAPIER, [-33, 2, 0], [.35, 2, 33]);
  addFixedBox(physics, RAPIER, [33, 2, 0], [.35, 2, 33]);

  BUILDINGS.forEach((definition, index) => {
    const progress = (index + 1) / (BUILDINGS.length + 1);
    const position = roadCurve.getPointAt(progress);
    const tangent = roadCurve.getTangentAt(progress).normalize();
    const outward = new THREE.Vector3(tangent.z, 0, -tangent.x).normalize();
    const disembark = position.clone().addScaledVector(outward, 2.15).setY(.92);
    stops.set(definition.route, { route: definition.route, label: definition.label, progress, position, tangent, disembark });
    const post = addMesh(root, new THREE.CylinderGeometry(.06, .08, 1.4, 7), standard(0x315f63), position.clone().addScaledVector(outward, 1.7).setY(.7).toArray());
    addMesh(post, new THREE.BoxGeometry(.65, .38, .1), standard(0xf2bd54), [0, .48, 0]);
  });

  return { root, interactions, labels, roadCurve, stops };
}
