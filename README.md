# Priyanshu's Little Universe

An explorable foothill town and a conventional, route-based portfolio for Priyanshu Bisht. The page starts with the physical Three.js/Rapier town when WebGL is available; the illustrated HTML/CSS town is a complete fallback, not a replacement for the 3D experience.

## Run locally

Requirements: Node.js `20.19+` or `22.12+` and npm. Install the locked dependencies and start Vite:

```powershell
npm ci
npm run dev
```

Open the local URL printed by Vite. For a production build and local production preview:

```powershell
npm run build
npm run preview
```

## Portfolio routes

- `/` — welcome page and town
- `/about`, `/projects`, `/projects/ashapure`, `/projects/arena-self-driving`
- `/notes`, `/books`, `/experience`, `/education`, `/achievements`, `/contact`
- `/bus` — town bus destination board
- `/resume.pdf` — opens the real PDF if one is added; currently the portfolio explains that no PDF has been supplied

Project and profile facts are kept in `data.js`; semantic route content is rendered from `content.js`. The static shell and fallback illustration live in `index.html` and `style.css`. The Three.js and Rapier world lives under `src/world/` and is booted by `src/main.js`. Vite splits Three.js, Rapier physics, and world code into separate content-hashed chunks for independent browser caching.

Books and Notes intentionally show empty states until real entries are provided. The project pages do not link to repositories, demos, or screenshots that were not supplied.

## Documents and assets still to upload

The site is publishable without these files, but adding the real versions will replace the honest empty states and illustrative artwork:

- `resume.pdf` in the project root — the current Résumé link shows a message until the real PDF is present.
- `profile.png` in the project root — the portrait used in the welcome card. Use a web-optimised PNG or replace the path in `index.html` if you prefer another format.
- Project evidence for `AshaPure` and `Arena Self-Driving`: repository URLs, live demo URLs, screenshots, and any measured results you want shown. Add verified links to `data.js`; do not add invented evidence.
- Books and Notes entries: real book titles, reading status, takeaways, and note content. Add them to `data.js` and the relevant renderer in `content.js`.
- Optional reference material: `reference/little-universe-brief.md` and `reference/reference-video.mp4` if visual comparison or future content audits are needed. These are not required for deployment.

Do not upload private credentials, unpublished client data, or placeholder PDFs/screenshots. The current UI intentionally labels missing evidence instead of presenting invented work.

## Explore and access

- Use the header or portfolio cards to open any section without moving the avatar.
- On desktop, the 3D town starts immediately on page load. The welcome dialog explains the controls; choose `Let's start` to enter on foot, walk to landmarks, or board the Town Loop for a third-person ride. The bus follows an outer road loop and eases into stops; the avatar is hidden during travel to keep it inside the coach.
- On foot, use WASD or arrow keys to move, drag to orbit, the wheel to zoom, Space to jump, and E near a landmark or bus to interact.
- Phone sized screens run the same physical Three.js/Rapier world with touch controls, provided WebGL is available. If a phone cannot create a WebGL context, the illustrated road map automatically becomes the fallback with tap targets for each landmark and the Town Loop. The portfolio navigation stays in the visible header, and every stop opens the same route content.
- `Browse without 3D` is an intentional manual fallback. It stays on the current page, removes the loading/error card, and exposes the clickable illustrated town; it does not open the three-card portfolio overview.
- Press Escape to close the active panel, guide, menu, or ride as appropriate. Reduced-motion settings skip the bus journey animation.
- If WebGL or the 3D world is unavailable, the loading card changes to a recoverable error that identifies the initialization stage. The illustrated fallback and full HTML portfolio remain available.

## 3D loading lifecycle

The 3D world is the primary experience:

1. `src/main.js` starts the world immediately; it does not wait for an idle callback or use a fixed timeout to declare success or failure.
2. `src/world/create-world.js` initializes Rapier, the renderer, the town, the procedural character, the bus, input, resize handling, and the initial camera.
3. The scene matrix is updated and a first frame is rendered before collision-aware camera and label updates begin.
4. Only after that first render does the world emit `onReady`; the loading card is then removed and the fallback scene is hidden.
5. If initialization throws, the error includes the failing stage (`physics`, `renderer`, `town`, `character`, `bus`, or `finalizing`), partial resources are disposed, and the 2D map remains available.
6. Camera and label raycasts use only registered obstacle meshes, preventing lights, groups, sprites, and incomplete scene objects from causing `matrixWorld` failures.

There are no GLTF/GLB, remote texture, font, or external model promises in the current world. Buildings, bus, terrain textures, labels, and the character are generated locally in the browser.

## Checks

```powershell
npm run check
npm test
```

`npm test` builds the site and runs `tests/browser-smoke.js` in headless Chrome. The browser test currently expects Chrome at `C:\Program Files\Google\Chrome\Application\chrome.exe`; update `chromePath` in that test if Chrome is installed elsewhere. It writes review screenshots to `tests/artifacts/`.

The browser suite verifies the 3D canvas and ready state, onboarding/map behavior, keyboard movement, camera orbit, bus travel and skip states, route navigation, Help Desk input ownership, mobile physical-world readiness, touch movement, responsive overflow, and browser runtime errors. If the sandbox blocks local loopback access, run the same commands in a normal local terminal.

The player uses a fixed 60 Hz Rapier character controller, capsule collision, autostep and ground snap. Static colliders protect building footprints, hedges, trees, steps, and the town boundary; the bus has a kinematic collider while moving. See [DEPLOYMENT.md](DEPLOYMENT.md) for hosting, immutable hashed-asset caching, and direct-route fallback requirements.
