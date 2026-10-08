# Priyanshu's Little Universe

An explorable foothill town and a conventional, route-based portfolio for Priyanshu Bisht. The 3D scene is an optional way to explore: the same portfolio content is available through semantic HTML, the header, and direct links.

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

Project and profile facts are kept in `data.js`; semantic route content is rendered from `content.js`. The static shell and fallback illustration live in `index.html` and `style.css`. The optional Three.js and Rapier world lives under `src/world/` and is loaded separately by `src/app.js`.

Books and Notes intentionally show empty states until real entries are provided. The project pages do not link to repositories, demos, or screenshots that were not supplied.

## Explore and access

- Use the header or portfolio cards to open any section without moving the avatar.
- In the town, use WASD or arrow keys to move, drag to orbit, the wheel to zoom, Space to jump, and E to interact. The bus is a short walk from the courtyard spawn.
- On touch screens, use the on-screen joystick and action buttons. The menu, route links, and content panels remain available without 3D controls.
- Press Escape to close the active panel, guide, menu, or ride as appropriate. Reduced-motion settings skip the bus journey animation.
- If WebGL or the 3D world is unavailable, the illustrated fallback and full HTML portfolio remain available.

## Checks

```powershell
npm run check
npm test
```

`npm test` builds the site and runs `tests/browser-smoke.js` in headless Chrome. The browser test currently expects Chrome at `C:\Program Files\Google\Chrome\Application\chrome.exe`; update `chromePath` in that test if Chrome is installed elsewhere. It writes review screenshots to `tests/artifacts/`.

See [DEPLOYMENT.md](DEPLOYMENT.md) for production hosting steps and direct-route fallback requirements.
