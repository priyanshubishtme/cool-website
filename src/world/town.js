import * as THREE from 'three';
import { createLabel, makeCanvasTexture, roundedBox } from './utils.js';

const BUILDINGS = [
  { label: 'Workshop', route: '/projects', type: 'workshop', position: [-14, -9], color: 0xc96f4b, roof: 0x315f63 },
  { label: 'Library', route: '/books', type: 'library', position: [0, -18], color: 0xd6a75d, roof: 0x72413a },
  { label: 'Story Garden', route: '/about', type: 'garden', position: [14, -9], color: 0x8cae75, roof: 0x375f49 },
  { label: 'Learning Station', route: '/education', type: 'station', position: [14, 9], color: 0x4e8fa1, roof: 0xd3983b },
  { label: 'Trophy Pavilion', route: '/achievements', type: 'trophy', position: [0, 18], color: 0xe1bd65, roof: 0x704e34 },
  { label: 'Post Office', route: '/contact', type: 'post', position: [-14, 9], color: 0xb96b65, roof: 0x315f63 },
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
      // Keep the top face front-facing so roads, paths, and water render from above.
      indices.push(a, a + 1, a + 2, a + 2, a + 1, a + 3);
    }
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geometry.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
  return geometry;
}

function offsetCurve(curve, offset, segments = 180) {
  const points = [];
  for (let index = 0; index <= segments; index += 1) {
    const progress = index / segments;
    const point = curve.getPointAt(progress);
    const tangent = curve.getTangentAt(progress).normalize();
    point.x += tangent.z * offset;
    point.z -= tangent.x * offset;
    point.y += .035;
    points.push(point);
  }
  return new THREE.CatmullRomCurve3(points, false, 'centripetal');
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
  const yaw = Math.atan2(-x, -z);
  group.rotation.y = yaw;
  const bodyRotation = { x: 0, y: Math.sin(yaw / 2), z: 0, w: Math.cos(yaw / 2) };
  const localToWorld = ([localX, localY, localZ]) => new THREE.Vector3(localX, localY, localZ)
    .applyAxisAngle(new THREE.Vector3(0, 1, 0), yaw).add(group.position).toArray();
  let width = definition.type === 'workshop' ? 4.8 : definition.type === 'library' ? 3.7 : 3.8, depth = definition.type === 'workshop' ? 3.5 : definition.type === 'post' ? 3.15 : 3.2, height = 2.8;
  const wood = standard(0x76513b), cream = standard(0xf1d995);
  const windowMaterial = standard(0xa9dbe0, { emissive: 0x274b52, emissiveIntensity: .22 });
  const facadeWindow = (wx, wy = 1.8) => {
    addMesh(group, new THREE.BoxGeometry(.82, .88, .14), wood, [wx, wy, depth / 2 + .07]);
    addMesh(group, new THREE.BoxGeometry(.66, .7, .06), windowMaterial, [wx, wy, depth / 2 + .15]);
    addMesh(group, new THREE.BoxGeometry(.055, .7, .07), cream, [wx, wy, depth / 2 + .19]);
    addMesh(group, new THREE.BoxGeometry(.66, .055, .07), cream, [wx, wy, depth / 2 + .19]);
  };
  if (definition.type === 'garden') {
    const hedge = standard(0x547a48);
    for (const [hx, hz, sx, sz] of [[0, -1.7, 3.8, .35], [-1.75, 0, .35, 3.4], [1.75, 0, .35, 3.4]]) addMesh(group, new THREE.BoxGeometry(sx, 1.05, sz), hedge, [hx, .52, hz]);
    addMesh(group, new THREE.CylinderGeometry(1.15, 1.3, .28, 16), standard(0xd0b477), [0, .14, 0]);
    const arch = addMesh(group, new THREE.TorusGeometry(1.05, .13, 8, 16, Math.PI), standard(0x805d3b), [0, 1.05, 1.48]); arch.rotation.z = Math.PI;
    addFixedBox(physics, RAPIER, localToWorld([-1.75,.52,0]), [.18,.52,1.7], bodyRotation);
    addFixedBox(physics, RAPIER, localToWorld([1.75,.52,0]), [.18,.52,1.7], bodyRotation);
    addFixedBox(physics, RAPIER, localToWorld([0,.52,-1.7]), [1.9,.52,.18], bodyRotation);
    width = 3.8; depth = 3.8; height = 2.2;
  } else if (definition.type === 'trophy') {
    width = 4.4; depth = 4.0; height = 3.5;
    addMesh(group, new THREE.BoxGeometry(5.0,.28,4.6), standard(0x79533b), [0,.14,0]);
    addMesh(group, new THREE.BoxGeometry(4.5,.14,4.1), standard(0xe1bd65), [0,.35,0]);
    for (const px of [-1.8,1.8]) for (const pz of [-1.55,1.55]) {
      addMesh(group, new THREE.CylinderGeometry(.16,.22,2.6,8), standard(0xf0dcaa), [px,1.72,pz]);
      addMesh(group, new THREE.CylinderGeometry(.26,.26,.12,8), standard(0x805d3b), [px,.48,pz]);
    }
    addMesh(group, new THREE.BoxGeometry(5.0,.35,4.8), standard(definition.roof), [0,3.15,0]);
    addMesh(group, new THREE.BoxGeometry(4.5,.16,4.3), standard(0x46716b), [0,3.4,0]);
    addMesh(group, new THREE.BoxGeometry(.72,.62,.62), standard(0x9b7140), [0,.88,0]);
    const cup=addMesh(group,new THREE.CylinderGeometry(.25,.16,.48,12),standard(0xf1c95b,{metalness:.4}),[0,1.43,0]);
    addMesh(cup,new THREE.TorusGeometry(.25,.055,6,12,Math.PI),cup.material,[-.2,.06,0]).rotation.z=Math.PI/2;
    for (const px of [-1.8,1.8]) for (const pz of [-1.55,1.55]) addFixedBox(physics,RAPIER,localToWorld([px,1.72,pz]),[.22,1.3,.22],bodyRotation);
  } else {
    const foundation = addMesh(group,new THREE.BoxGeometry(width+.38,.22,depth+.38),standard(0x79533b),[0,.12,0]); foundation.receiveShadow=true;
    if (definition.type === 'workshop') {
      width=4.8; depth=3.5; height=2.35;
      addMesh(group,new THREE.BoxGeometry(width,height,depth),standard(definition.color),[0,height/2,0]);
      addMesh(group,new THREE.BoxGeometry(width+.45,.18,depth+.42),standard(definition.roof),[0,height+.02,0]);
      const roofWing=addMesh(group,new THREE.BoxGeometry(2.6,.2,depth+.45),standard(0x3d7071),[-1.0,height+.35,0]); roofWing.rotation.z=-.15;
      addMesh(group,new THREE.BoxGeometry(1.75,1.65,.14),standard(0x513d32),[0,.86,depth/2+.08]);
      addMesh(group,new THREE.BoxGeometry(1.48,1.38,.06),standard(0x53827d),[0,.86,depth/2+.17]);
      for(let i=0;i<5;i++) addMesh(group,new THREE.BoxGeometry(1.46,.045,.07),standard(0xd5b777),[0,.25+i*.25,depth/2+.21]);
      facadeWindow(-1.68,1.48);
      addMesh(group,new THREE.CylinderGeometry(.2,.25,.7,8),standard(0x62584b),[1.65,height+.48,-.65]);
    } else if (definition.type === 'library') {
      width=3.7; depth=3.2; height=3.35;
      addMesh(group,new THREE.BoxGeometry(width,height,depth),standard(definition.color),[0,height/2,0]);
      addMesh(group,new THREE.BoxGeometry(width+.4,.2,depth+.35),standard(definition.roof),[0,height+.06,0]);
      addMesh(group,new THREE.BoxGeometry(width+.12,.34,.2),standard(0x805d3b),[0,height-.08,depth/2+.12]);
      for(let i=-2;i<=2;i++) addMesh(group,new THREE.BoxGeometry(.22,.52,.12),standard([0x9c4f45,0x477c72,0xd2a447,0x56729a,0x9c4f45][i+2]),[i*.28,height-.02,depth/2+.21]);
      addMesh(group,new THREE.CylinderGeometry(.82,.92,.72,8),standard(0x947650),[0,height+.48,0]);
      addMesh(group,new THREE.ConeGeometry(.72,.65,8),standard(0x754c3c),[0,height+1.15,0]);
      facadeWindow(-1.05,1.8); facadeWindow(1.05,1.8);
    } else if (definition.type === 'station') {
      width=3.8; depth=3.2; height=2.55;
      addMesh(group,new THREE.BoxGeometry(width,height,depth),standard(definition.color),[0,height/2,0]);
      addMesh(group,new THREE.BoxGeometry(width+.48,.2,depth+.42),standard(0xd4a24a),[0,height+.03,0]);
      addMesh(group,new THREE.BoxGeometry(1.12,1.55,.9),standard(0x3c6870),[0,height+.86,0]);
      addMesh(group,new THREE.BoxGeometry(1.34,.14,1.12),standard(0x805d3b),[0,height+1.68,0]);
      const face=addMesh(group,new THREE.CylinderGeometry(.42,.42,.12,24),standard(0xfff0c8),[0,height+.88,.49]); face.rotation.x=Math.PI/2;
      addMesh(group,new THREE.BoxGeometry(.035,.3,.04),standard(0x354f4d),[0,height+.9,.57]);
      addMesh(group,new THREE.BoxGeometry(.24,.035,.04),standard(0x354f4d),[.1,height+.79,.57]);
      facadeWindow(-1.2,1.65); facadeWindow(1.2,1.65);
    } else {
      width=3.8; depth=3.15; height=2.8;
      addMesh(group,new THREE.BoxGeometry(width,height,depth),standard(definition.color),[0,height/2,0]);
      const roofL=addMesh(group,new THREE.BoxGeometry(2.1,.18,depth+.5),standard(definition.roof),[-.9,height+.45,0]); roofL.rotation.z=-.32;
      const roofR=addMesh(group,new THREE.BoxGeometry(2.1,.18,depth+.5),standard(definition.roof),[.9,height+.45,0]); roofR.rotation.z=.32;
      addMesh(group,new THREE.BoxGeometry(.72,1.5,.14),wood,[0,.75,depth/2+.08]);
      addMesh(group,new THREE.BoxGeometry(1.55,.65,.14),standard(0xf3dfac),[0,2.2,depth/2+.16]);
      addMesh(group,new THREE.BoxGeometry(.62,.09,.2),standard(0x9a5147),[0,1.45,depth/2+.18]);
      facadeWindow(-1.25,1.85); facadeWindow(1.25,1.85);
      addMesh(group,new THREE.BoxGeometry(width+.2,.12,.16),wood,[0,.3,0]);
    }
    addFixedBox(physics, RAPIER, [x,height/2,z],[width/2,height/2,depth/2],bodyRotation);
  }
  markObstacle(group);
  return { group, width, depth, height };
}
function createTree(x, z, scale = 1) {
  const group = new THREE.Group();
  group.position.set(x, 0, z);
  const trunk = addMesh(group, new THREE.CylinderGeometry(.16 * scale, .23 * scale, 1.5 * scale, 7), standard(0x79553a), [0, .75 * scale, 0]);
  const crownMaterials = [standard(0x416f4d), standard(0x4e8052), standard(0x365f49)];
  for (let tier = 0; tier < 3; tier += 1) {
    const size = (1.08 - tier * .17) * scale;
    const crown = addMesh(group, new THREE.ConeGeometry(size, 1.38 * scale, 7), crownMaterials[tier], [0, (1.5 + tier * .55) * scale, 0]);
    crown.rotation.y = x * .31 + z + tier * .38;
  }
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
  const ground = addMesh(root, new THREE.CircleGeometry(44, lowPower ? 64 : 120), standard(0x86a86f, { map: groundTexture }), [0, -.035, 0]);
  ground.rotation.x = -Math.PI / 2;
  ground.receiveShadow = true;
  ground.castShadow = false;
  ground.userData.cameraObstacle = false;
  addFixedBox(physics, RAPIER, [0, -.55, 0], [44, .5, 44]);

  // The bus travels on a wide perimeter loop. A straight eastern approach links the central courtyard
  // to that loop; each building stop is projected onto its outer edge to prevent bus/building overlap.
  const roadCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(3, .035, 0), new THREE.Vector3(10, .035, 0), new THREE.Vector3(20, .035, 0),
    new THREE.Vector3(29, .035, 0), new THREE.Vector3(25, .035, 17), new THREE.Vector3(0, .035, 29),
    new THREE.Vector3(-25, .035, 17), new THREE.Vector3(-29, .035, 0), new THREE.Vector3(-25, .035, -17),
    new THREE.Vector3(0, .035, -29), new THREE.Vector3(25, .035, -17), new THREE.Vector3(29, .035, 0),
    new THREE.Vector3(20, .035, 0), new THREE.Vector3(10, .035, 0),
  ], true, 'catmullrom', .22);
  const nearestRoadProgress = (target) => {
    let nearest = 0;
    let nearestDistance = Infinity;
    for (let sample = 0; sample < 1800; sample += 1) {
      const progress = sample / 1800;
      const point = roadCurve.getPointAt(progress);
      const distance = point.distanceToSquared(target);
      if (distance < nearestDistance) { nearestDistance = distance; nearest = progress; }
    }
    return nearest;
  };
  const roadSegments = lowPower ? 90 : 180;
  const roadBed = addMesh(root, createRibbonGeometry(roadCurve, 2.75, roadSegments), standard(0x806a52), null);
  roadBed.castShadow = false;
  roadBed.receiveShadow = true;
  const roadTexture = makeCanvasTexture((context, size) => {
    context.fillStyle = '#69716c';
    context.fillRect(0, 0, size, size);
    for (let row = 0; row < 8; row += 1) {
      const y = row * 32;
      context.strokeStyle = 'rgba(35,45,42,.32)';
      context.lineWidth = 2;
      context.beginPath();
      context.moveTo(0, y);
      context.lineTo(size, y);
      context.stroke();
      const offset = row % 2 ? 32 : 0;
      for (let x = offset; x < size; x += 64) {
        context.beginPath();
        context.moveTo(x, y);
        context.lineTo(x, y + 32);
        context.stroke();
      }
    }
    context.fillStyle = 'rgba(226,221,199,.12)';
    for (let i = 0; i < 42; i += 1) context.fillRect((i * 47) % size, (i * 71) % size, 7, 4);
  }, 256);
  roadTexture.wrapS = roadTexture.wrapT = THREE.RepeatWrapping;
  roadTexture.repeat.set(1, 18);
  roadTexture.anisotropy = lowPower ? 1 : 4;
  const road = addMesh(root, createRibbonGeometry(roadCurve, 2.35, roadSegments), standard(0xffffff, { map: roadTexture, roughness: .94 }), null);
  road.position.y = .025;
  road.castShadow = false;
  road.receiveShadow = true;
  const roadTrim = standard(0x777c72);
  for (const side of [-1, 1]) {
    const edge = addMesh(root, new THREE.TubeGeometry(offsetCurve(roadCurve, side * 1.12, roadSegments), roadSegments, .025, 5, false), roadTrim, null, false);
    edge.castShadow = false;
    edge.userData.cameraObstacle = false;
  }

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
    const front = new THREE.Vector3(-x, 0, -z).normalize();
    const interactionPosition = new THREE.Vector3(x, .9, z).addScaledVector(front, created.depth / 2 + 1.05);
    interactions.push({ ...definition, position: interactionPosition, radius: 2.65 });
    labels.push({ element: createLabel(container, definition.label), position: anchor, route: definition.route });
  });
  const pathMaterial = standard(0xb2aa91);
  const pathBedMaterial = standard(0x77766d);
  BUILDINGS.forEach(({ position: [x, z], type }) => {
    const desiredStop = new THREE.Vector3(x, .035, z).setLength(29);
    const progress = nearestRoadProgress(desiredStop);
    const stop = roadCurve.getPointAt(progress);
    const approach = new THREE.Vector3(x - stop.x, 0, z - stop.z).normalize();
    const front = new THREE.Vector3(-x, 0, -z).normalize();
    const depth = type === 'garden' ? 3.8 : 3.1;
    const start = stop.clone().addScaledVector(approach, 1.08);
    const end = new THREE.Vector3(x, .035, z).addScaledVector(front, depth / 2 + .24);
    const bend = new THREE.Vector3(-approach.z, 0, approach.x);
    const curve = new THREE.CatmullRomCurve3([
      start,
      start.clone().lerp(end, .34).addScaledVector(bend, .45),
      start.clone().lerp(end, .72).addScaledVector(bend, -.2),
      end,
    ], false, 'centripetal');
    const bed = addMesh(root, createRibbonGeometry(curve, 2.15, 28), pathBedMaterial, null, false);
    bed.position.y = .008;
    bed.receiveShadow = true;
    const path = addMesh(root, createRibbonGeometry(curve, 1.72, 28), pathMaterial, null, false);
    path.position.y = .035;
    path.receiveShadow = true;
  });

  const treePositions = [
    [-29,-18,1.2],[-34,-5,.9],[-30,13,1.1],[-20,26,.9],[-10,33,1.2],[5,33,1],
    [22,26,1.2],[32,17,.9],[35,0,1.15],[30,-18,.9],[19,-30,1.2],[3,-35,1],
    [-17,-31,1.15],[-32,-25,1],[-35,5,.8],[34,5,.65],[-34,8,.62],[0,-37,.58],
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
    const mountainX = Math.sin(angle) * distance;
    const mountainZ = Math.cos(angle) * distance;
    const mountainY = height / 2 - .5;
    const mountain = addMesh(root, new THREE.ConeGeometry(8 + i % 4, height, 6), mountainMaterial, [mountainX, mountainY, mountainZ]);
    const mountainBody = physics.createRigidBody(RAPIER.RigidBodyDesc.fixed().setTranslation(mountainX, mountainY, mountainZ));
    physics.createCollider(RAPIER.ColliderDesc.cylinder(height / 2, 7 + i % 4).setFriction(.85), mountainBody);
    mountain.userData.cameraObstacle = false;
    const snow = addMesh(mountain, new THREE.ConeGeometry(3.2 + i % 2, 3.4, 6), standard(0xe8e4d2), [0, height / 2 - 1.9, 0]);
    snow.userData.cameraObstacle = false;
  }

  const stops = new Map();
  // Keep the Town Loop parked at the central courtyard for the on-foot arrival.
  const courtyardProgress = nearestRoadProgress(new THREE.Vector3(3, .035, 0));
  const courtyardPosition = roadCurve.getPointAt(courtyardProgress);
  const courtyardTangent = roadCurve.getTangentAt(courtyardProgress).normalize();
  stops.set('/courtyard', {
    route: '/courtyard', label: 'Central Courtyard', progress: courtyardProgress,
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
  addFixedBox(physics, RAPIER, [0, 2, -43], [43, 2, .35]);
  addFixedBox(physics, RAPIER, [0, 2, 43], [43, 2, .35]);
  addFixedBox(physics, RAPIER, [-43, 2, 0], [.35, 2, 43]);
  addFixedBox(physics, RAPIER, [43, 2, 0], [.35, 2, 43]);

  BUILDINGS.forEach((definition, index) => {
    const desiredStop = new THREE.Vector3(definition.position[0], .035, definition.position[1]).setLength(29);
    const progress = nearestRoadProgress(desiredStop);
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
