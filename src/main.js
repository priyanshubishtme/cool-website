
const container = document.querySelector('#town');
const loading = container?.querySelector('[data-world-loading]');
const fallback = container?.querySelector('[data-scene-fallback]');
const prompt = container?.querySelector('[data-interaction-prompt]');
const promptText = prompt?.querySelector('span');
const intro = document.querySelector('[data-intro-card]');
const destinations = document.querySelector('#destination-drawer');
const help = document.querySelector('#world-help');
const destinationToggle = document.querySelector('[data-toggle-destinations]');
const helpToggle = document.querySelector('[data-toggle-help]');
let nearest = null;
let currentMode = 'paused';
let world = null;

function setExpanded(button, panel, open) {
  if (!button || !panel) return;
  panel.hidden = !open;
  button.setAttribute('aria-expanded', String(open));
}

function setMode(mode) {
  currentMode = mode;
  world?.setMode(mode);
  container?.classList.toggle('world-input-active', mode === 'world');
  document.body.classList.toggle('world-mode', mode === 'world');
}

function openRoute(route, source = 'world') {
  window.dispatchEvent(new CustomEvent('world:interact', { detail: { route, source } }));
}

function handleWorldError(error) {
  console.error('3D world unavailable:', error);
  container?.classList.add('world-failed');
  container?.classList.remove('world-ready');
  if (fallback) fallback.hidden = false;
  if (loading) {
    loading.innerHTML = '<div><strong>The 3D town could not start.</strong><small>The complete portfolio and illustrated destination fallback remain available.</small></div><a href="#browse">Browse the portfolio</a>';
  }
  window.dispatchEvent(new CustomEvent('world:error', { detail: { message: error.message } }));
}

async function bootWorld() {
  if (!container) return;
  if (!('WebGLRenderingContext' in window)) {
    handleWorldError(new Error('WebGL is not available in this browser.'));
    return;
  }
  try {
    const { createWorld } = await import('./world/create-world.js');
    world = createWorld({
      container,
      onInteract: (route) => openRoute(route, 'nearby-object'),
      onNearChange: (value) => {
        nearest = value;
        if (!prompt) return;
        prompt.hidden = !value || currentMode !== 'world';
        if (value && promptText) promptText.textContent = `${value.type === 'bus' ? 'Board' : 'Open'} ${value.label}`;
      },
      onBusState: (value) => window.dispatchEvent(new CustomEvent('world:bus-state', { detail: value })),
      onReady: (metrics) => {
        container.classList.add('world-ready');
        container.classList.remove('world-failed');
        if (loading) loading.hidden = true;
        if (fallback) fallback.hidden = true;
        container.dataset.quality = metrics.lowPower ? 'low' : 'high';
        window.dispatchEvent(new CustomEvent('world:ready', { detail: metrics }));
      },
      onError: handleWorldError,
    });
    window.LITTLE_UNIVERSE_WORLD = world;
    world.setMode(currentMode).start();
  } catch (error) {
    handleWorldError(error);
  }
}

if ('requestIdleCallback' in window) requestIdleCallback(bootWorld, { timeout: 700 });
else setTimeout(bootWorld, 1);

window.addEventListener('app:mode', (event) => {
  const next = event.detail?.mode || 'world';
  if (next === 'reading' || next === 'guide' || next === 'bus') {
    setExpanded(destinationToggle, destinations, false);
    setExpanded(helpToggle, help, false);
  }
  setMode(next);
  if (next !== 'world' && prompt) prompt.hidden = true;
});

window.addEventListener('beforeunload', () => world?.dispose(), { once: true });

document.querySelector('[data-start-world]')?.addEventListener('click', () => {
  intro?.classList.add('is-collapsed');
  setMode('world');
  container.focus({ preventScroll: true });
  container.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'center' });
  const hint = document.querySelector('[data-orientation-hint]');
  if (hint) setTimeout(() => hint.classList.add('is-quiet'), 6500);
});

document.querySelector('[data-dismiss-intro]')?.addEventListener('click', () => intro?.classList.add('is-collapsed'));
document.querySelector('[data-return-courtyard]')?.addEventListener('click', () => {
  world?.returnToCourtyard();
  setMode('world');
  container.focus({ preventScroll: true });
});

destinationToggle?.addEventListener('click', () => {
  const open = destinations.hidden;
  setExpanded(destinationToggle, destinations, open);
  setExpanded(helpToggle, help, false);
  setMode(open ? 'destination-menu' : 'world');
  if (open) destinations.querySelector('a')?.focus();
});

document.querySelector('[data-close-destinations]')?.addEventListener('click', () => {
  setExpanded(destinationToggle, destinations, false);
  setMode('world');
  destinationToggle.focus();
});

helpToggle?.addEventListener('click', () => {
  const open = help.hidden;
  setExpanded(helpToggle, help, open);
  setExpanded(destinationToggle, destinations, false);
  setMode(open ? 'paused' : 'world');
  if (open) help.querySelector('[data-close-help]')?.focus();
});

document.querySelector('[data-close-help]')?.addEventListener('click', () => {
  setExpanded(helpToggle, help, false);
  setMode('world');
  helpToggle.focus();
});

prompt?.addEventListener('click', () => nearest?.route && openRoute(nearest.route, 'interaction-prompt'));

container?.addEventListener('focus', () => {
  if (currentMode === 'paused' && help?.hidden && destinations?.hidden) setMode('world');
});

document.addEventListener('keydown', (event) => {
  if (event.key !== 'Escape' || !document.querySelector('#content-overlay')?.hidden || !document.querySelector('#guide-panel')?.hidden) return;
  if (!destinations?.hidden) {
    setExpanded(destinationToggle, destinations, false);
    setMode('world');
  } else if (!help?.hidden) {
    setExpanded(helpToggle, help, false);
    setMode('world');
  } else if (document.activeElement === container || container?.contains(document.activeElement)) {
    setExpanded(helpToggle, help, true);
    setMode('paused');
  }
});
