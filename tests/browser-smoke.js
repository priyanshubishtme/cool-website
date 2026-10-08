const http = require('http');
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');
const assert = require('assert/strict');

const root = path.resolve(__dirname, '..', 'dist');
const port = 41739;
const debugPort = 9223;
const chromePath = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const profilePath = path.join(__dirname, '.chrome-profile');
const artifactsPath = path.join(__dirname, 'artifacts');
const mime = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.map': 'application/json', '.wasm': 'application/wasm', '.pdf': 'application/pdf' };

const server = http.createServer((request, response) => {
  const urlPath = decodeURIComponent(new URL(request.url, `http://127.0.0.1:${port}`).pathname);
  const requested = path.join(root, urlPath === '/' ? 'index.html' : urlPath.slice(1));
  const file = fs.existsSync(requested) && fs.statSync(requested).isFile() ? requested : path.join(root, 'index.html');
  response.writeHead(200, { 'content-type': `${mime[path.extname(file)] || 'application/octet-stream'}; charset=utf-8`, 'cache-control': 'no-store' });
  if (request.method === 'HEAD') response.end();
  else fs.createReadStream(file).pipe(response);
});

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function getDebugPage() {
  for (let attempt = 0; attempt < 50; attempt += 1) {
    try {
      const pages = await fetch(`http://127.0.0.1:${debugPort}/json/list`).then((response) => response.json());
      const page = pages.find((target) => target.type === 'page' && !target.url.startsWith('chrome-extension://'));
      if (page?.webSocketDebuggerUrl) return page;
    } catch {}
    await delay(100);
  }
  throw new Error('Chrome DevTools endpoint did not become available.');
}

class Cdp {
  constructor(url) {
    this.id = 0;
    this.pending = new Map();
    this.events = [];
    this.socket = new WebSocket(url);
  }
  async connect() {
    await new Promise((resolve, reject) => {
      this.socket.addEventListener('open', resolve, { once: true });
      this.socket.addEventListener('error', reject, { once: true });
    });
    this.socket.addEventListener('message', (event) => {
      const message = JSON.parse(event.data);
      if (message.id) {
        const pending = this.pending.get(message.id);
        if (!pending) return;
        this.pending.delete(message.id);
        if (message.error) pending.reject(new Error(message.error.message));
        else pending.resolve(message.result);
      } else this.events.push(message);
    });
  }
  send(method, params = {}) {
    const id = ++this.id;
    return new Promise((resolve, reject) => {
      this.pending.set(id, { resolve, reject });
      this.socket.send(JSON.stringify({ id, method, params }));
    });
  }
  async evaluate(expression) {
    const result = await this.send('Runtime.evaluate', { expression, awaitPromise: true, returnByValue: true, userGesture: true });
    if (result.exceptionDetails) throw new Error(result.exceptionDetails.text || 'Browser evaluation failed.');
    return result.result.value;
  }
  close() { this.socket.close(); }
}

async function waitFor(cdp, expression, label) {
  for (let attempt = 0; attempt < 120; attempt += 1) {
    if (await cdp.evaluate(expression)) return;
    await delay(100);
  }
  const state = await cdp.evaluate(`({ href: location.href, ready: document.readyState, title: document.title, scripts: [...document.scripts].map(script => script.src), body: document.body?.innerText?.slice(0, 180) })`);
  const recentEvents = cdp.events.filter((event) => event.method === 'Runtime.exceptionThrown' || event.method === 'Log.entryAdded').slice(-5);
  throw new Error(`Timed out waiting for ${label}\nState: ${JSON.stringify(state)}\nEvents: ${JSON.stringify(recentEvents)}`);
}

async function navigate(cdp, pathname) {
  await cdp.send('Page.navigate', { url: `http://127.0.0.1:${port}${pathname}` });
  await waitFor(cdp, "document.readyState === 'complete' && Boolean(window.LITTLE_UNIVERSE_VIEWS)", pathname);
}

async function screenshot(cdp, name) {
  const capture = await cdp.send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: false });
  fs.writeFileSync(path.join(artifactsPath, name), Buffer.from(capture.data, 'base64'));
}

async function key(cdp, type, keyValue, code) {
  await cdp.send('Input.dispatchKeyEvent', { type, key: keyValue, code, windowsVirtualKeyCode: keyValue.length === 1 ? keyValue.toUpperCase().charCodeAt(0) : 0 });
}

async function holdKeys(cdp, keys, duration = 500) {
  for (const [keyValue, code] of keys) await key(cdp, 'rawKeyDown', keyValue, code);
  await delay(duration);
  for (const [keyValue, code] of [...keys].reverse()) await key(cdp, 'keyUp', keyValue, code);
  await delay(100);
}

async function approachBus(cdp) {
  // The default camera faces +Z: A moves +X and D moves -X.
  for (let attempt = 0; attempt < 8; attempt += 1) {
    const state = await cdp.evaluate('window.LITTLE_UNIVERSE_WORLD.getDebugState()');
    if (state.busDistance < 2.65) return;
    const keys = [];
    keys.push(state.busPosition.x > state.playerPosition.x ? ['a', 'KeyA'] : ['d', 'KeyD']);
    keys.push(state.busPosition.z > state.playerPosition.z ? ['w', 'KeyW'] : ['s', 'KeyS']);
    await holdKeys(cdp, keys, 300);
  }
  const distance = await cdp.evaluate('window.LITTLE_UNIVERSE_WORLD.getDebugState().busDistance');
  assert.ok(distance < 3.2, `Could not reach the courtyard bus through movement: ${distance}`);
}

async function pressInteract(cdp) {
  await key(cdp, 'rawKeyDown', 'e', 'KeyE');
  await delay(100);
  await key(cdp, 'keyUp', 'e', 'KeyE');
}

async function run() {
  fs.rmSync(profilePath, { recursive: true, force: true });
  fs.mkdirSync(artifactsPath, { recursive: true });
  await new Promise((resolve) => server.listen(port, '127.0.0.1', resolve));

  const chrome = spawn(chromePath, [
    '--headless=new', '--disable-gpu', '--no-first-run', '--no-default-browser-check',
    '--disable-background-networking', '--disable-component-update', '--disable-extensions',
    `--remote-debugging-port=${debugPort}`, `--user-data-dir=${profilePath}`,
    `http://127.0.0.1:${port}/`
  ], { stdio: 'ignore' });

  let cdp;
  try {
    const page = await getDebugPage();
    cdp = new Cdp(page.webSocketDebuggerUrl);
    await cdp.connect();
    await cdp.send('Page.enable');
    await cdp.send('Runtime.enable');
    await cdp.send('Log.enable');
    await cdp.send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false });
    await navigate(cdp, '/');

    assert.equal(await cdp.evaluate("document.title"), "Priyanshu's Little Universe");
    assert.equal(await cdp.evaluate("document.querySelector('.world-rail') === null"), true);
    assert.equal(await cdp.evaluate("Boolean(document.querySelector('[data-toggle-destinations]'))"), true);
    await waitFor(cdp, "window.LITTLE_UNIVERSE_WORLD?.getDebugState().ready === true", '3D world readiness');
    assert.equal(await cdp.evaluate("document.querySelectorAll('#town canvas').length"), 1);
    assert.equal(await cdp.evaluate("document.querySelector('[data-scene-fallback]').hidden"), true);
    await cdp.evaluate("document.querySelector('[data-start-world]').click()");
    await waitFor(cdp, "window.LITTLE_UNIVERSE_WORLD.getDebugState().mode === 'world'", 'world input mode');

    await cdp.evaluate("window.LITTLE_UNIVERSE_WORLD.returnToCourtyard(); document.querySelector('#town').focus()");
    await waitFor(cdp, "window.LITTLE_UNIVERSE_WORLD.getDebugState().grounded", 'grounded before straight movement');
    const straightStart = await cdp.evaluate("window.LITTLE_UNIVERSE_WORLD.getDebugState().playerPosition");
    await holdKeys(cdp, [['w', 'KeyW']], 650);
    const straightEnd = await cdp.evaluate("window.LITTLE_UNIVERSE_WORLD.getDebugState().playerPosition");
    const straightDistance = Math.hypot(straightEnd.x - straightStart.x, straightEnd.z - straightStart.z);
    assert.ok(straightDistance > 0.6, `Straight movement too small: ${straightDistance}`);

    await cdp.evaluate("window.LITTLE_UNIVERSE_WORLD.returnToCourtyard(); document.querySelector('#town').focus()");
    await waitFor(cdp, "window.LITTLE_UNIVERSE_WORLD.getDebugState().grounded", 'grounded before diagonal movement');
    const diagonalStart = await cdp.evaluate("window.LITTLE_UNIVERSE_WORLD.getDebugState().playerPosition");
    await holdKeys(cdp, [['w', 'KeyW'], ['d', 'KeyD']], 650);
    const diagonalEnd = await cdp.evaluate("window.LITTLE_UNIVERSE_WORLD.getDebugState().playerPosition");
    const diagonalDistance = Math.hypot(diagonalEnd.x - diagonalStart.x, diagonalEnd.z - diagonalStart.z);
    assert.ok(Math.abs(diagonalDistance - straightDistance) / straightDistance < .25, `Diagonal speed differs: straight ${straightDistance}, diagonal ${diagonalDistance}`);

    await cdp.evaluate("window.LITTLE_UNIVERSE_WORLD.returnToCourtyard(); document.querySelector('#town').focus()");
    await waitFor(cdp, "window.LITTLE_UNIVERSE_WORLD.getDebugState().grounded", 'grounded player');
    await key(cdp, 'rawKeyDown', ' ', 'Space'); await key(cdp, 'keyUp', ' ', 'Space');
    await waitFor(cdp, "['jump','fall'].includes(window.LITTLE_UNIVERSE_WORLD.getDebugState().animation)", 'jump animation');
    await waitFor(cdp, "window.LITTLE_UNIVERSE_WORLD.getDebugState().grounded", 'jump landing');

    const cameraBefore = await cdp.evaluate("window.LITTLE_UNIVERSE_WORLD.getDebugState().cameraDistance");
    await cdp.send('Input.dispatchMouseEvent', { type: 'mouseWheel', x: 800, y: 450, deltaY: 280, deltaX: 0 });
    await delay(150);
    const cameraAfter = await cdp.evaluate("window.LITTLE_UNIVERSE_WORLD.getDebugState().cameraDistance");
    assert.ok(cameraAfter >= 2.7 && cameraAfter <= 10.5 && cameraAfter !== cameraBefore);

    const worldMetrics = await cdp.evaluate("window.LITTLE_UNIVERSE_WORLD.getDebugState()");
    assert.ok(worldMetrics.frameCount > 10 && worldMetrics.averageFps > 0);
    await screenshot(cdp, 'desktop-home.png');

    await cdp.evaluate("document.querySelector('.quick-links [data-route=\"/projects\"]').click()");
    await waitFor(cdp, "location.pathname === '/projects' && !document.querySelector('#content-overlay').hidden", 'projects route');
    assert.equal(await cdp.evaluate("document.querySelectorAll('.project-card').length"), 2);
    await cdp.evaluate("document.querySelector('.case-study-link').click()");
    await waitFor(cdp, "location.pathname === '/projects/ashapure'", 'AshaPure detail');
    assert.match(await cdp.evaluate("document.querySelector('#panel-title').textContent"), /AshaPure/);
    await screenshot(cdp, 'desktop-project.png');
    await cdp.evaluate('history.back()');
    await waitFor(cdp, "location.pathname === '/projects'", 'browser Back to project index');
    await cdp.evaluate("document.querySelector('[data-close]').click()");
    await waitFor(cdp, "location.pathname === '/' && document.querySelector('#content-overlay').hidden", 'close returning to world');

    await cdp.evaluate("window.__busStates=[]; window.addEventListener('world:bus-state', event => window.__busStates.push(event.detail.state))");
    await cdp.evaluate("window.LITTLE_UNIVERSE_WORLD.returnToCourtyard(); document.querySelector('#town').focus()");
    await approachBus(cdp);
    await pressInteract(cdp);
    await waitFor(cdp, "location.pathname === '/bus'", 'bus menu');
    await cdp.evaluate("document.querySelector('[data-bus-stop=\"/projects\"]').click()");
    for (const state of ['departing', 'driving', 'arriving']) {
      await waitFor(cdp, `window.__busStates.includes('${state}')`, `bus ${state} state`);
      assert.match(await cdp.evaluate("document.querySelector('#ride-status').textContent"), state === 'driving' ? /road/i : new RegExp(state, 'i'));
    }
    await waitFor(cdp, "window.__busStates.includes('stopped') && location.pathname === '/projects'", 'completed bus arrival and destination route');
    const completedStates = await cdp.evaluate('window.__busStates');
    assert.ok(['boarding', 'departing', 'driving', 'arriving', 'stopped'].every(state => completedStates.includes(state)), `Missing ride states: ${completedStates}`);
    const completedOrder = ['boarding', 'departing', 'driving', 'arriving', 'stopped'].map(state => completedStates.indexOf(state));
    assert.ok(completedOrder.every((index, position) => position === 0 || index > completedOrder[position - 1]), `Bus states were out of order: ${completedStates}`);
    const arrivalPosition = await cdp.evaluate('window.LITTLE_UNIVERSE_WORLD.getDebugState().playerPosition');
    await cdp.evaluate("document.querySelector('[data-close]').click()");
    await waitFor(cdp, "location.pathname === '/'", 'world after completed bus ride');
    const returnedPosition = await cdp.evaluate('window.LITTLE_UNIVERSE_WORLD.getDebugState().playerPosition');
    assert.ok(Math.hypot(returnedPosition.x-arrivalPosition.x, returnedPosition.z-arrivalPosition.z) < .02, 'Closing the destination reset the disembarked world position');

    await cdp.evaluate('window.__busStates=[]; document.querySelector("#town").focus()');
    await pressInteract(cdp);
    await waitFor(cdp, "location.pathname === '/bus'", 'bus menu after reboarding');
    await cdp.evaluate("document.querySelector('[data-bus-stop=\"/contact\"]').click()");
    await waitFor(cdp, "!document.querySelector('#ride-hud').hidden", 'bus ride HUD');
    await waitFor(cdp, "window.__busStates.includes('departing')", 'second ride departure');
    await waitFor(cdp, "window.__busStates.includes('driving')", 'second ride driving');
    await cdp.evaluate("document.querySelector('[data-skip-ride]').click()");
    await waitFor(cdp, "location.pathname === '/contact' && !document.querySelector('#content-overlay').hidden", 'skipped ride destination');
    assert.equal(await cdp.evaluate("window.LITTLE_UNIVERSE_WORLD.getDebugState().busState"), 'stopped');
    assert.ok(await cdp.evaluate("window.__busStates.includes('stopped')"), 'Skip Ride did not reset the bus state');
    assert.equal(await cdp.evaluate("document.querySelectorAll('.social-list a').length"), 5);
    assert.equal(await cdp.evaluate("document.querySelector('.email-address').href.startsWith('mailto:')"), true);
    await cdp.evaluate("document.querySelector('[data-close]').click()");
    await waitFor(cdp, "location.pathname === '/'", 'close after bus route');
    await cdp.evaluate('window.__busStates=[]; document.querySelector("#town").focus()');
    await pressInteract(cdp);
    await waitFor(cdp, "location.pathname === '/bus'", 'bus can be reboarded after Skip Ride');
    await cdp.evaluate("document.querySelector('[data-bus-stop=\"/about\"]').click()");
    await waitFor(cdp, "location.pathname === '/about' && window.LITTLE_UNIVERSE_WORLD.getDebugState().busState === 'stopped'", 'bus reusable after skipped ride');
    assert.ok(await cdp.evaluate("window.__busStates.includes('driving') && window.__busStates.includes('stopped')"));
    await cdp.evaluate("document.querySelector('[data-close]').click()");
    await waitFor(cdp, "location.pathname === '/'", 'world after third bus ride');

    await cdp.evaluate("document.querySelector('.guide-toggle').click()");
    await waitFor(cdp, "!document.querySelector('#guide-panel').hidden", 'guide open');
    assert.equal(await cdp.evaluate("document.querySelector('.guide-toggle').hidden"), true);
    await key(cdp, 'rawKeyDown', 'Escape', 'Escape'); await key(cdp, 'keyUp', 'Escape', 'Escape');
    await waitFor(cdp, "document.querySelector('#guide-panel').hidden && document.activeElement === document.querySelector('.guide-toggle')", 'Escape closes guide and restores focus');
    await cdp.evaluate("document.querySelector('.guide-toggle').click()");
    await waitFor(cdp, "!document.querySelector('#guide-panel').hidden", 'guide reopened');
    const guidePosition = await cdp.evaluate("window.LITTLE_UNIVERSE_WORLD.getDebugState().playerPosition");
    await cdp.evaluate("document.querySelector('.guide-panel [data-guide-action=\"skills\"]').focus()");
    await holdKeys(cdp, [['w', 'KeyW'], ['e', 'KeyE']], 300);
    const guidePositionAfter = await cdp.evaluate("window.LITTLE_UNIVERSE_WORLD.getDebugState().playerPosition");
    assert.ok(Math.hypot(guidePositionAfter.x-guidePosition.x, guidePositionAfter.z-guidePosition.z) < .02, 'Player moved while guide owned input');
    await cdp.evaluate("document.querySelector('.guide-panel [data-guide-action=\"skills\"]').click()");
    await waitFor(cdp, "location.pathname === '/education'", 'guide navigation');
    assert.match(await cdp.evaluate("document.querySelector('#panel-title').textContent"), /progress/i);

    await navigate(cdp, '/projects/arena-self-driving');
    assert.equal(await cdp.evaluate("document.querySelector('#panel-title').textContent"), 'Arena Self-Driving');
    assert.equal(await cdp.evaluate("document.querySelectorAll('.case-study-body section').length"), 4);

    for (const route of ['/about', '/notes', '/books', '/experience', '/education', '/achievements', '/contact', '/projects', '/projects/ashapure', '/projects/arena-self-driving']) {
      await navigate(cdp, route);
      assert.equal(await cdp.evaluate("!document.querySelector('#content-overlay').hidden && Boolean(document.querySelector('#panel-title'))"), true, `${route} did not render a panel`);
    }

    await navigate(cdp, '/');
    await cdp.evaluate("document.querySelector('.resume-link').click()");
    await waitFor(cdp, "!document.querySelector('#toast').hidden && document.querySelector('#toast').textContent.includes('not been supplied')", 'honest resume fallback');

    await navigate(cdp, '/path-that-does-not-exist');
    assert.match(await cdp.evaluate("document.querySelector('#panel-title').textContent"), /nowhere/i);

    await cdp.send('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 1, mobile: true });
    await navigate(cdp, '/');
    await waitFor(cdp, "window.LITTLE_UNIVERSE_WORLD?.getDebugState().ready === true", 'mobile 3D world readiness');
    assert.equal(await cdp.evaluate("getComputedStyle(document.querySelector('.mobile-world-controls')).display"), 'none');
    assert.equal(await cdp.evaluate('document.documentElement.scrollWidth <= window.innerWidth + 1'), true);
    await cdp.evaluate("document.querySelector('[data-start-world]').click(); document.querySelector('#town').focus()");
    assert.equal(await cdp.evaluate("getComputedStyle(document.querySelector('.mobile-world-controls')).display"), 'flex');
    const touchStart = await cdp.evaluate("window.LITTLE_UNIVERSE_WORLD.getDebugState().playerPosition");
    await cdp.evaluate(`(() => { const el=document.querySelector('[data-joystick]'); const r=el.getBoundingClientRect(); el.dispatchEvent(new PointerEvent('pointerdown',{pointerId:11,clientX:r.left+r.width/2,clientY:r.top+r.height/2,bubbles:true})); el.dispatchEvent(new PointerEvent('pointermove',{pointerId:11,clientX:r.left+r.width/2+35,clientY:r.top+r.height/2-35,bubbles:true})); })()`);
    await delay(450);
    await cdp.evaluate(`(() => { const el=document.querySelector('[data-joystick]'); el.dispatchEvent(new PointerEvent('pointercancel',{pointerId:11,bubbles:true})); })()`);
    const touchEnd = await cdp.evaluate("window.LITTLE_UNIVERSE_WORLD.getDebugState().playerPosition");
    assert.ok(Math.hypot(touchEnd.x-touchStart.x,touchEnd.z-touchStart.z) > .2);
    await cdp.evaluate("document.querySelector('.menu-button').click()");
    assert.equal(await cdp.evaluate("[...document.querySelectorAll('.quick-links .secondary-link')].every(link => getComputedStyle(link).display !== 'none')"), true);
    assert.equal(await cdp.evaluate("document.body.classList.contains('menu-open') && document.querySelector('.menu-button').getAttribute('aria-expanded') === 'true' && getComputedStyle(document.querySelector('.guide-dock')).display === 'none'"), true, 'Guide launcher overlaps the expanded mobile menu');
    await screenshot(cdp, 'mobile-home.png');
    await cdp.evaluate("document.querySelector('.menu-button').click()");
    assert.notEqual(await cdp.evaluate("getComputedStyle(document.querySelector('.guide-dock')).display"), 'none', 'Guide launcher did not return after closing the menu');
    assert.equal(await cdp.evaluate("document.querySelector('.menu-button').getAttribute('aria-expanded')"), 'false');
    await navigate(cdp, '/projects/arena-self-driving');
    assert.equal(await cdp.evaluate('document.documentElement.scrollWidth <= window.innerWidth + 1'), true);
    await screenshot(cdp, 'mobile-project.png');

    await cdp.send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'reduce' }] });
    await navigate(cdp, '/bus');
    await cdp.evaluate("document.querySelector('[data-bus-stop=\"/about\"]').click()");
    await waitFor(cdp, "location.pathname === '/about'", 'reduced-motion instant bus route');

    const errors = cdp.events.filter((event) => event.method === 'Runtime.exceptionThrown' || (event.method === 'Log.entryAdded' && event.params.entry.level === 'error'));
    assert.deepEqual(errors.map((event) => event.params), [], 'Browser emitted runtime or log errors.');

    const measuredResources = await cdp.evaluate(`performance.getEntriesByType('resource').filter(entry => /create-world|assets/.test(entry.name)).map(entry => ({name:entry.name.split('/').pop(), duration:Math.round(entry.duration), transferSize:entry.transferSize}))`);
    console.log('Browser smoke tests passed');
    console.log('Measured active world:', JSON.stringify(worldMetrics));
    console.log('Measured resources:', JSON.stringify(measuredResources));
    console.log('Screenshots: tests/artifacts/desktop-home.png, desktop-project.png, mobile-home.png, mobile-project.png');
  } finally {
    if (cdp) cdp.close();
    chrome.kill();
    server.close();
    // Chrome may keep its Windows profile locked briefly after process exit.
    // The next run removes it before launch, when no process owns the lock.
  }
}

run().catch((error) => {
  console.error(error.stack || error);
  process.exitCode = 1;
});
