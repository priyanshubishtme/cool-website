const MOVEMENT_KEYS = new Set([
  'KeyW', 'KeyA', 'KeyS', 'KeyD',
  'ArrowUp', 'ArrowLeft', 'ArrowDown', 'ArrowRight',
  'ShiftLeft', 'ShiftRight', 'Space', 'KeyE',
]);

function isFormControl(target) {
  return target instanceof HTMLElement && (
    target.isContentEditable || /^(INPUT|TEXTAREA|SELECT|BUTTON)$/.test(target.tagName)
  );
}

export function createInput(container, canOwnInput) {
  const keys = new Set();
  const pressed = new Set();
  const pointerCleanups = [];
  const joystick = { x: 0, y: 0, pointerId: null };
  const joystickElement = container.querySelector('[data-joystick]');
  const knob = container.querySelector('[data-joystick-knob]');

  const clear = () => {
    keys.clear();
    pressed.clear();
    joystick.x = joystick.y = 0;
    joystick.pointerId = null;
    if (knob) knob.style.transform = 'translate(0px, 0px)';
  };

  const onKeyDown = (event) => {
    if (!MOVEMENT_KEYS.has(event.code) || !canOwnInput() || isFormControl(event.target)) return;
    event.preventDefault();
    if (!keys.has(event.code)) pressed.add(event.code);
    keys.add(event.code);
  };
  const onKeyUp = (event) => {
    keys.delete(event.code);
  };
  const onBlur = () => clear();
  const onFocusIn = (event) => isFormControl(event.target) && clear();
  const onVisibility = () => document.hidden && clear();
  window.addEventListener('keydown', onKeyDown);
  window.addEventListener('keyup', onKeyUp);
  window.addEventListener('blur', onBlur);
  document.addEventListener('focusin', onFocusIn);
  document.addEventListener('visibilitychange', onVisibility);

  if (joystickElement) {
    const updateJoystick = (event) => {
      if (event.pointerId !== joystick.pointerId) return;
      const rect = joystickElement.getBoundingClientRect();
      const radius = Math.max(20, Math.min(rect.width, rect.height) * 0.42);
      let x = event.clientX - (rect.left + rect.width / 2);
      let y = event.clientY - (rect.top + rect.height / 2);
      const length = Math.hypot(x, y);
      if (length > radius) {
        x *= radius / length;
        y *= radius / length;
      }
      joystick.x = x / radius;
      joystick.y = y / radius;
      if (knob) knob.style.transform = `translate(${x}px, ${y}px)`;
    };
    const down = (event) => {
      if (!canOwnInput() || joystick.pointerId !== null) return;
      joystick.pointerId = event.pointerId;
      try { joystickElement.setPointerCapture?.(event.pointerId); } catch { /* Pointer may already be cancelled. */ }
      updateJoystick(event);
      event.preventDefault();
    };
    const end = (event) => {
      if (event.pointerId !== joystick.pointerId) return;
      joystick.x = joystick.y = 0;
      joystick.pointerId = null;
      if (knob) knob.style.transform = 'translate(0px, 0px)';
    };
    joystickElement.addEventListener('pointerdown', down);
    joystickElement.addEventListener('pointermove', updateJoystick);
    joystickElement.addEventListener('pointerup', end);
    joystickElement.addEventListener('pointercancel', end);
    pointerCleanups.push(() => {
      joystickElement.removeEventListener('pointerdown', down);
      joystickElement.removeEventListener('pointermove', updateJoystick);
      joystickElement.removeEventListener('pointerup', end);
      joystickElement.removeEventListener('pointercancel', end);
    });
  }

  const bindButton = (selector, action) => {
    const element = container.querySelector(selector);
    if (!element) return;
    const activePointers = new Set();
    const down = (event) => {
      if (!canOwnInput()) return;
      activePointers.add(event.pointerId);
      pressed.add(action);
      try { element.setPointerCapture?.(event.pointerId); } catch { /* Pointer may already be cancelled. */ }
      event.preventDefault();
    };
    const up = (event) => activePointers.delete(event.pointerId);
    element.addEventListener('pointerdown', down);
    element.addEventListener('pointerup', up);
    element.addEventListener('pointercancel', up);
    pointerCleanups.push(() => {
      element.removeEventListener('pointerdown', down);
      element.removeEventListener('pointerup', up);
      element.removeEventListener('pointercancel', up);
    });
  };
  bindButton('[data-world-jump]', 'Space');
  bindButton('[data-world-interact]', 'KeyE');

  return {
    getMove() {
      let x = Number(keys.has('KeyD') || keys.has('ArrowRight')) - Number(keys.has('KeyA') || keys.has('ArrowLeft')) + joystick.x;
      let y = Number(keys.has('KeyW') || keys.has('ArrowUp')) - Number(keys.has('KeyS') || keys.has('ArrowDown')) - joystick.y;
      const length = Math.hypot(x, y);
      if (length > 1) { x /= length; y /= length; }
      return { x, y };
    },
    isRunning: () => keys.has('ShiftLeft') || keys.has('ShiftRight'),
    consume(action) {
      const value = pressed.has(action);
      pressed.delete(action);
      return value;
    },
    clear,
    dispose() {
      clear();
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
      window.removeEventListener('blur', onBlur);
      document.removeEventListener('focusin', onFocusIn);
      document.removeEventListener('visibilitychange', onVisibility);
      pointerCleanups.forEach((cleanup) => cleanup());
    },
  };
}
