import '../data.js';
import '../content.js';
import '../script.js';

const container = document.querySelector('#town');
const loading = container?.querySelector('[data-world-loading]');
const fallback = container?.querySelector('[data-scene-fallback]');
const prompt = container?.querySelector('[data-interaction-prompt]');
const promptText = prompt?.querySelector('span');
const intro = document.querySelector('[data-intro-card]');
const onboarding = document.querySelector('#world-onboarding');
const destinations = document.querySelector('#destination-drawer');
const help = document.querySelector('#world-help');
const destinationToggle = document.querySelector('[data-toggle-destinations]');
const helpToggle = document.querySelector('[data-toggle-help]');
const browseFallback = document.querySelector('[data-browse-fallback]');
const loadingTitle = container?.querySelector('[data-world-loading-title]');
const loadingDetail = container?.querySelector('[data-world-loading-detail]');
let nearest = null;
let currentMode = 'paused';
let world = null;
let portfolioMode = location.hash === '#browse';
let startedWorld = false;
let fallbackMode = false;
let worldState = 'idle';
let reportedWorldError = false;

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
  document.body.classList.toggle('world-session', startedWorld && !portfolioMode);
}

function openRoute(route, source = 'world') {
  window.dispatchEvent(new CustomEvent('world:interact', { detail: { route, source } }));
}

function handleWorldError(error) {
  if (reportedWorldError) return;
  reportedWorldError = true;
  worldState = 'error';
  const message = error instanceof Error ? error.message : String(error);
  console.error('3D world unavailable:', error);
  container?.classList.add('world-failed');
  container?.classList.remove('world-ready');
  if (fallback) {
    fallback.hidden = false;
    fallback.setAttribute('aria-hidden', 'false');
  }
  if (fallbackMode) {
    if (loading) loading.hidden = true;
    loading?.classList.remove('is-error');
    return;
  }
  if (loading) loading.hidden = false;
  loading?.classList.add('is-error');
  if (loadingTitle) loadingTitle.textContent = '3D town unavailable';
  if (loadingDetail) loadingDetail.textContent = `${message} You can continue with the illustrated town.`;
  loading?.querySelector('.loading-orbit')?.setAttribute('aria-hidden', 'true');
  container?.querySelector('.fallback-map-note')?.classList.add('is-visible');
  const hint = document.querySelector('[data-orientation-hint]');
  if (hint) hint.textContent = 'Town map ? choose a place to explore ? portfolio links are in the header';
  window.dispatchEvent(new CustomEvent('world:error', { detail: { message: error.message } }));
}

async function bootWorld() {
  if (!container) return;
  if (worldState !== 'idle') return;
  worldState = 'initializing';
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
        worldState = 'ready';
        reportedWorldError = false;
        container.classList.add('world-ready');
        if (!fallbackMode) container.classList.remove('world-failed');
        if (loading) loading.hidden = true;
        loading?.classList.remove('is-error');
        loading?.classList.remove('is-error');
        if (fallback) {
          fallback.hidden = false;
          fallback.setAttribute('aria-hidden', String(!fallbackMode));
        }
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

bootWorld();

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

function setPortfolioMode(enabled, { updateHistory = true } = {}) {
  portfolioMode = enabled;
  document.body.classList.toggle('portfolio-mode', enabled);
  if (enabled) { setMode('paused'); document.querySelector('[data-intro-card]')?.classList.add('is-collapsed'); }
  else { document.body.classList.remove('portfolio-mode'); if (startedWorld) setMode('world'); }
  if (updateHistory) {
    if (enabled && location.hash !== '#browse') history.pushState({ route: '/', depth: 0, browse: true }, '', '/#browse');
    else if (!enabled && location.hash === '#browse') history.replaceState({ route: '/', depth: 0 }, '', '/');
  }
}

if (portfolioMode) { document.body.classList.add('portfolio-mode'); document.querySelector('[data-intro-card]')?.classList.add('is-collapsed'); }
document.querySelectorAll('[data-browse-portfolio]').forEach((link) => link.addEventListener('click', (event) => {
  event.preventDefault();
  if (onboarding?.open) onboarding.close('browse');
  setPortfolioMode(true);
}));
browseFallback?.addEventListener('click', (event) => {
  event.preventDefault();
  fallbackMode = true;
  worldState = 'fallback';
  if (loading) loading.hidden = true;
  loading?.classList.remove('is-error');
  if (fallback) {
    fallback.hidden = false;
    fallback.setAttribute('aria-hidden', 'false');
  }
  container?.classList.add('world-failed');
  container?.classList.remove('world-ready');
  container?.querySelector('.fallback-map-note')?.classList.remove('is-visible');
  setMode('paused');
});
document.querySelector('[data-return-to-town]')?.addEventListener('click', () => {
  if (history.state?.browse) history.back();
  else setPortfolioMode(false);
});
window.addEventListener('popstate', () => {
  const browsing = location.hash === '#browse' && location.pathname === '/';
  if (browsing !== portfolioMode) setPortfolioMode(browsing, { updateHistory: false });
});

function enterWorld() {
  if (onboarding?.open) onboarding.close('enter');
  intro?.classList.add('is-collapsed');
  startedWorld = true;
  setPortfolioMode(false, { updateHistory: false });
  setMode('world');
  container.focus({ preventScroll: true });
  container.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'center' });
  const hint = document.querySelector('[data-orientation-hint]');
  if (hint) setTimeout(() => hint.classList.add('is-quiet'), 6500);
}
document.querySelector('[data-start-world]')?.addEventListener('click', () => {
  if (onboarding && !onboarding.open) onboarding.showModal();
});
document.querySelector('[data-enter-world]')?.addEventListener('click', enterWorld);

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
