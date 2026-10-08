import * as THREE from 'three';

export const clamp = THREE.MathUtils.clamp;
export const damp = (value, target, lambda, dt) => THREE.MathUtils.damp(value, target, lambda, dt);
export const dampAngle = (value, target, lambda, dt) => {
  const delta = Math.atan2(Math.sin(target - value), Math.cos(target - value));
  return value + delta * (1 - Math.exp(-lambda * dt));
};

export function disposeObject(root) {
  root.traverse((object) => {
    object.geometry?.dispose?.();
    const materials = Array.isArray(object.material) ? object.material : [object.material];
    materials.filter(Boolean).forEach((material) => {
      Object.values(material).forEach((value) => value?.isTexture && value.dispose());
      material.dispose?.();
    });
  });
}

export function roundedBox(width, height, depth, radius = 0.12) {
  const shape = new THREE.Shape();
  const x = -width / 2;
  const y = -height / 2;
  shape.moveTo(x + radius, y);
  shape.lineTo(x + width - radius, y);
  shape.quadraticCurveTo(x + width, y, x + width, y + radius);
  shape.lineTo(x + width, y + height - radius);
  shape.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  shape.lineTo(x + radius, y + height);
  shape.quadraticCurveTo(x, y + height, x, y + height - radius);
  shape.lineTo(x, y + radius);
  shape.quadraticCurveTo(x, y, x + radius, y);
  return new THREE.ExtrudeGeometry(shape, {
    depth,
    bevelEnabled: true,
    bevelSegments: 2,
    bevelSize: radius * 0.45,
    bevelThickness: radius * 0.45,
    curveSegments: 4,
  }).translate(0, 0, -depth / 2);
}

export function createLabel(container, text) {
  const element = document.createElement('div');
  element.className = 'world-label';
  element.textContent = text;
  Object.assign(element.style, {
    position: 'absolute',
    left: '0',
    top: '0',
    transform: 'translate(-50%, -100%)',
    pointerEvents: 'none',
    padding: '5px 9px',
    borderRadius: '999px',
    color: '#fff9e9',
    background: 'rgba(20, 48, 49, .84)',
    border: '1px solid rgba(255, 207, 112, .7)',
    font: '600 12px/1.2 system-ui, sans-serif',
    whiteSpace: 'nowrap',
    textShadow: '0 1px 2px #173b39',
    boxShadow: '0 2px 10px rgba(0,0,0,.18)',
    willChange: 'transform',
    zIndex: '3',
  });
  container.appendChild(element);
  return element;
}

export function makeCanvasTexture(draw, size = 128) {
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = size;
  const context = canvas.getContext('2d');
  draw(context, size);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}
