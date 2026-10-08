(() => {
  'use strict';

  const data = window.LITTLE_UNIVERSE_DATA;
  const views = window.LITTLE_UNIVERSE_VIEWS;
  if (!data || !views) throw new Error('Little Universe data or view renderer failed to load.');

  const overlay = document.querySelector('#content-overlay');
  const panel = overlay.querySelector('.content-panel');
  const panelContent = document.querySelector('#panel-content');
  const closeButton = overlay.querySelector('[data-close]');
  const town = document.querySelector('#town');
  const bus = document.querySelector('.bus');
  const busBoard = bus.querySelector('.bus-board');
  const rideHud = document.querySelector('#ride-hud');
  const rideStatus = document.querySelector('#ride-status');
  const toast = document.querySelector('#toast');
  const routeStatus = document.querySelector('#route-status');
  const menuButton = document.querySelector('.menu-button');
  const menuLabel = menuButton.querySelector('.sr-only');
  const quickLinks = document.querySelector('.quick-links');
  const guideDock = document.querySelector('.guide-dock');
  const guideToggle = guideDock.querySelector('.guide-toggle');
  const guidePanel = guideDock.querySelector('#guide-panel');
  const guideAnswer = guideDock.querySelector('.guide-answer');
  const backgroundRoots = [
    document.querySelector('.site-header'), document.querySelector('main'),
    document.querySelector('.world-rail'), document.querySelector('.mobile-dock'),
    guideDock
  ].filter(Boolean);

  let returnFocus = null;
  let rideTimer = null;
  let rideDestination = null;
  let currentDepth = 0;
  let toastTimer = null;

  const reducedMotion = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
  const cleanPath = (path) => {
    const withoutQuery = path.split('?')[0].split('#')[0];
    return withoutQuery.replace(/\/+$/, '') || '/';
  };

  function resolveRoute(path) {
    const route = cleanPath(path);
    const projectMatch = route.match(/^\/projects\/([^/]+)$/);
    if (projectMatch) {
      const project = data.projects.find((item) => item.slug === projectMatch[1]);
      return project
        ? { route, title: project.title, landmark: 'workshop', html: views.projectDetail(project) }
        : { route, title: 'Path not found', landmark: null, html: views.notFound(), missing: true };
    }

    const routes = {
      '/projects': ['Projects', 'workshop', views.projects],
      '/about': ['About', 'lookout', views.about],
      '/experience': ['Experience', 'workshop', views.experience],
      '/education': ['Education & skills', 'learning', views.education],
      '/achievements': ['Achievements', 'pavilion', views.achievements],
      '/books': ['Books', 'library', () => views.emptyState('books')],
      '/notes': ['Notes', 'library', () => views.emptyState('notes')],
      '/contact': ['Contact', 'post-office', views.contact],
      '/bus': ['Town bus', null, views.bus]
    };
    const match = routes[route];
    if (match) return { route, title: match[0], landmark: match[1], html: match[2]() };
    if (route === '/') return { route: '/', title: 'Home', landmark: null, html: '' };
    return { route, title: 'Path not found', landmark: null, html: views.notFound(), missing: true };
  }

  function setBackgroundInert(inert) {
    backgroundRoots.forEach((element) => { element.inert = inert; });
  }

  function updateActiveNavigation(route) {
    const section = route.startsWith('/projects/') ? '/projects' : route;
    document.querySelectorAll('[data-nav-route]').forEach((link) => {
      const active = link.dataset.navRoute === section;
      if (active) link.setAttribute('aria-current', 'page');
      else link.removeAttribute('aria-current');
    });
  }

  function updateWorldFocus(landmark) {
    if (landmark) town.dataset.focus = landmark;
    else delete town.dataset.focus;
  }

  function announceRoute(title) {
    routeStatus.textContent = `${title} opened.`;
  }

  function pushRoute(route) {
    const nextDepth = overlay.hidden && !document.body.classList.contains('bus-travelling')
      ? 1
      : (Number(history.state?.depth) || currentDepth || 0) + 1;
    currentDepth = nextDepth;
    history.pushState({ route, depth: nextDepth }, '', route);
  }

  function openPanel(resolved, { push = true, preserveFocus = false } = {}) {
    const wasClosed = overlay.hidden;
    if (wasClosed && !preserveFocus) returnFocus = document.activeElement;
    if (push && location.pathname !== resolved.route) pushRoute(resolved.route);

    panelContent.innerHTML = resolved.html;
    panel.scrollTop = 0;
    overlay.hidden = false;
    document.body.classList.add('panel-open', 'reading-mode');
    document.body.classList.remove('bus-travelling');
    rideHud.hidden = true;
    bus?.classList.remove('riding');
    toggleGuide(false, { restoreFocus: false });
    window.dispatchEvent(new CustomEvent('app:mode', { detail: { mode: 'reading' } }));
    setBackgroundInert(true);
    updateWorldFocus(resolved.landmark);
    updateActiveNavigation(resolved.route);
    document.title = `${resolved.title} · Priyanshu's Little Universe`;
    announceRoute(resolved.title);
    closeButton.focus({ preventScroll: true });
  }

  function renderRoute(path, options = {}) {
    const resolved = resolveRoute(path);
    if (resolved.route === '/') {
      closeToWorld({ useHistory: options.push !== false });
      return;
    }
    openPanel(resolved, options);
  }

  function hidePanel({ restoreFocus = false } = {}) {
    if (overlay.hidden) return;
    overlay.hidden = true;
    document.body.classList.remove('panel-open', 'reading-mode');
    window.dispatchEvent(new CustomEvent('app:mode', { detail: { mode: 'world' } }));
    setBackgroundInert(false);
    panelContent.innerHTML = '';
    document.title = "Priyanshu's Little Universe";
    updateActiveNavigation('/');
    if (restoreFocus && returnFocus instanceof HTMLElement && returnFocus.isConnected) {
      returnFocus.focus({ preventScroll: true });
    }
  }

  function closeToWorld({ useHistory = true } = {}) {
    cancelRide();
    hidePanel({ restoreFocus: true });
    updateWorldFocus(null);
    if (!useHistory) return;

    const depth = Number(history.state?.depth) || currentDepth;
    if (depth > 0) {
      history.go(-depth);
    } else {
      currentDepth = 0;
      history.replaceState({ route: '/', depth: 0 }, '', '/');
    }
  }

  function showToast(message) {
    toast.textContent = message;
    toast.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => { toast.hidden = true; }, 4600);
  }

  function closeMenu({ returnToButton = false } = {}) {
    const wasOpen = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('menu-open');
    menuLabel.textContent = 'Open menu';
    quickLinks.classList.remove('open');
    if (wasOpen && returnToButton) menuButton.focus();
  }

  function toggleGuide(force, { restoreFocus = true } = {}) {
    const open = typeof force === 'boolean' ? force : guidePanel.hidden;
    guidePanel.hidden = !open;
    guideToggle.hidden = open;
    document.body.classList.toggle('guide-open', open);
    guideToggle.setAttribute('aria-expanded', String(open));
    guideAnswer.textContent = '';
    window.dispatchEvent(new CustomEvent('app:mode', { detail: { mode: open ? 'guide' : overlay.hidden ? 'world' : 'reading' } }));
    if (open) guidePanel.querySelector('[data-close-guide]').focus();
    else if (restoreFocus && document.activeElement && guidePanel.contains(document.activeElement)) guideToggle.focus();
  }

  function guideAction(action) {
    const target = data.guideActions[action];
    if (!target) return;
    if (target.answer) {
      guideAnswer.textContent = target.answer;
      guideAnswer.classList.remove('answer-reveal');
      requestAnimationFrame(() => guideAnswer.classList.add('answer-reveal'));
      return;
    }
    toggleGuide(false, { restoreFocus: false });
    renderRoute(target.route);
    showToast(target.feedback);
  }

  function startRide(route) {
    const destination = resolveRoute(route);
    if (destination.missing || destination.route === '/') return;
    clearTimeout(rideTimer);
    rideDestination = destination;
    hidePanel();
    setBackgroundInert(false);
    document.body.classList.add('bus-travelling');
    document.body.classList.remove('reading-mode');
    window.dispatchEvent(new CustomEvent('app:mode', { detail: { mode: 'bus' } }));
    updateWorldFocus(destination.landmark);
    rideHud.hidden = false;
    rideStatus.textContent = `Boarding for ${destination.title}`;
    if (busBoard) busBoard.textContent = destination.title.toUpperCase().slice(0, 16);

    const world = window.LITTLE_UNIVERSE_WORLD;
    const accepted = world?.travelBus(route);
    if (accepted) {
      if (reducedMotion()) world.skipBus();
      return;
    }

    if (world?.getDebugState().ready) showToast('Board the bus at its current stop for a ride. Opening this destination instantly instead.');
    rideTimer = setTimeout(finishRide, 0);
  }

  function finishRide() {
    if (!rideDestination) return;
    clearTimeout(rideTimer);
    const destination = rideDestination;
    rideDestination = null;
    bus?.classList.remove('riding');
    if (busBoard) busBoard.textContent = 'TOWN LOOP';
    rideHud.hidden = true;
    // Keep bus-travelling set until openPanel pushes the destination so the
    // route depth includes both the bus menu and the selected stop.
    openPanel(destination, { push: true, preserveFocus: true });
  }

  function cancelRide() {
    clearTimeout(rideTimer);
    rideTimer = null;
    rideDestination = null;
    document.body.classList.remove('bus-travelling');
    bus?.classList.remove('riding');
    if (busBoard) busBoard.textContent = 'TOWN LOOP';
    rideHud.hidden = true;
    window.LITTLE_UNIVERSE_WORLD?.skipBus();
    window.dispatchEvent(new CustomEvent('app:mode', { detail: { mode: 'world' } }));
  }

  async function openResume(event) {
    event.preventDefault();
    try {
      const response = await fetch('/resume.pdf', { method: 'HEAD', cache: 'no-store' });
      const isPdf = response.ok && (response.headers.get('content-type') || '').toLowerCase().includes('application/pdf');
      if (isPdf) window.location.assign('/resume.pdf');
      else showToast('The real résumé PDF has not been supplied yet. No placeholder file will be downloaded.');
    } catch {
      showToast('The résumé could not be checked. Please contact Priyanshu for the latest copy.');
    }
  }

  document.addEventListener('click', (event) => {
    const routeTarget = event.target.closest('[data-route]');
    if (routeTarget) {
      const isPlainClick = event.button === 0 && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey;
      if (!isPlainClick) return;
      event.preventDefault();
      document.querySelector('#world-onboarding')?.close();
      closeMenu();
      renderRoute(routeTarget.dataset.route);
      return;
    }

    const busTrigger = event.target.closest('[data-bus]');
    if (busTrigger) {
      renderRoute('/bus');
      return;
    }

    const stop = event.target.closest('[data-bus-stop]');
    if (stop) {
      startRide(stop.dataset.busStop);
      return;
    }

    const guideActionButton = event.target.closest('[data-guide-action]');
    if (guideActionButton) {
      guideAction(guideActionButton.dataset.guideAction);
      return;
    }

    const resume = event.target.closest('a[href="/resume.pdf"]');
    if (resume) openResume(event);
  });

  closeButton.addEventListener('click', () => closeToWorld());
  overlay.addEventListener('click', (event) => { if (event.target === overlay) closeToWorld(); });
  document.querySelector('[data-skip-ride]').addEventListener('click', () => {
    if (!window.LITTLE_UNIVERSE_WORLD?.skipBus()) finishRide();
  });

  window.addEventListener('world:interact', (event) => {
    if (event.detail?.route) renderRoute(event.detail.route);
  });

  window.addEventListener('world:bus-state', (event) => {
    if (!rideDestination) return;
    const { state, label } = event.detail || {};
    const messages = {
      boarding: `Boarding for ${label}`,
      departing: `Departing for ${label}`,
      driving: `On the road to ${label}`,
      arriving: `Arriving at ${label}`,
    };
    if (messages[state]) rideStatus.textContent = messages[state];
    if (state === 'stopped') finishRide();
  });

  menuButton.addEventListener('click', () => {
    const open = menuButton.getAttribute('aria-expanded') !== 'true';
    menuButton.setAttribute('aria-expanded', String(open));
    document.body.classList.toggle('menu-open', open);
    menuLabel.textContent = open ? 'Close menu' : 'Open menu';
    quickLinks.classList.toggle('open', open);
    if (open) quickLinks.querySelector('a').focus();
  });

  guideToggle.addEventListener('click', () => toggleGuide());
  guideDock.querySelector('[data-close-guide]').addEventListener('click', () => {
    toggleGuide(false);
    guideToggle.focus();
  });

  document.addEventListener('pointerdown', (event) => {
    if (!quickLinks.contains(event.target) && !menuButton.contains(event.target)) closeMenu();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      if (rideDestination) cancelRide();
      else if (!overlay.hidden) closeToWorld();
      else if (!guidePanel.hidden) { toggleGuide(false); guideToggle.focus(); }
      else closeMenu({ returnToButton: true });
      return;
    }

    if (event.key !== 'Tab' || overlay.hidden) return;
    const focusable = [...panel.querySelectorAll('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])')]
      .filter((element) => !element.hidden && element.offsetParent !== null);
    if (!focusable.length) { event.preventDefault(); panel.focus(); return; }
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && (document.activeElement === first || document.activeElement === panel)) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  });

  window.addEventListener('popstate', (event) => {
    cancelRide();
    currentDepth = Number(event.state?.depth) || 0;
    const resolved = resolveRoute(location.pathname);
    if (resolved.route === '/') {
      hidePanel({ restoreFocus: true });
      updateWorldFocus(null);
      updateActiveNavigation('/');
    } else {
      openPanel(resolved, { push: false });
    }
  });

  document.addEventListener('visibilitychange', () => {
    document.body.classList.toggle('scene-paused', document.hidden);
  });

  if (navigator.deviceMemory && navigator.deviceMemory <= 4) document.body.classList.add('low-power');
  document.querySelector('#year').textContent = new Date().getFullYear();

  const initial = resolveRoute(location.pathname);
  currentDepth = 0;
  history.replaceState({ route: initial.route, depth: 0 }, '', location.pathname + location.search + location.hash);
  updateActiveNavigation(initial.route);
  if (initial.route !== '/') openPanel(initial, { push: false });
})();
