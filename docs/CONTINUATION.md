# Continuation notes

## Current direction

Priyanshu's Little Universe has a desktop Three.js/Rapier town and a phone-first HTML/CSS road map. Both use the same route content and browser navigation. The portfolio should stay easy to explore, with short copy and visible navigation.

## Latest experience decisions

- Desktop starts with the character standing outside the bus. A compact welcome dialog explains walking, looking, and interacting; it opens while the scene loads behind it. Enter the town to begin on foot.
- The Town Loop follows an outer road that clears the building footprints; paved footpaths connect its stops to entrances. Bus motion eases into stops and chooses the shorter direction around the loop. The follow camera checks for scene obstacles. The player capsule is physically carried with the bus, but the avatar mesh is hidden during travel so it cannot poke through the roof. Stop controls and skip remain available.
- The avatar is still procedural low-poly geometry. The supplied portrait is saved as `public/profile.png` and guides the swept dark hair, warm complexion, subtle facial hair, and dark hoodie styling.
- Phone viewports (760px or narrower) bypass WebGL and Rapier. They show a winding 2D road with six clickable destination buildings, the character outside the bus, and a Town Loop bus stop. Header links remain available for the full portfolio.
- Desktop road/building layout remains spacious; buildings use distinct designs. Physics uses a 1/60 s fixed step, a Rapier capsule character controller with autostep/ground snap, static colliders for architecture/trees/steps/mountain bases/bounds, and a kinematic bus collider. Physical roadside notice boards and the duplicate field-guide panel were removed. The toolbar retains destinations and controls.
- If WebGL fails, the CSS town and semantic route navigation remain available.

## Key files

- `index.html`: accessible fallback town, mobile route SVG, welcome dialog, header and destination controls.
- `style.css`: world presentation, header contrast, modal, and responsive 2D map styles.
- `src/main.js`: world startup, phone WebGL bypass, onboarding and mode transitions.
- `src/world/town.js`: 3D roads, trees, distinct buildings, placement and colliders.
- `src/world/bus.js`: bus model, follow-camera anchor and ride state.
- `src/world/character.js`: low-poly player avatar and movement poses.
- `src/world/create-world.js`: Three.js/Rapier setup, camera, movement and world API.
- `content.js`, `data.js`, `script.js`: shared route content and HTML portfolio navigation.
- `public/profile.png`: portrait reference used in the welcome card.

## Local development

From the repository root in PowerShell:

```powershell
npm ci
npm run dev
```

For a production build, run `npm run build` and `npm run preview`. `npm run check` checks JavaScript syntax. `npm test` runs the headless Chrome smoke flow and writes screenshots under `tests/artifacts/`.

## Deployment

See `DEPLOYMENT.md` for static Vite deployment, Netlify rewrites, alternate-host history fallback, and rollback. Deploy the generated `dist` directory and rebuild it from source instead of editing hashed assets. Vite emits separate hashed world, Three.js, and Rapier chunks. Netlify caches `/assets/*` immutably for one year and revalidates the HTML shell. Rapier remains a large chunk (about 4.3 MB raw / 1.6 MB gzip in the last build); phones avoid requesting it.

## Performance and caching

- `vite.config.js` uses manual chunks for Three.js and `@dimforge/rapier3d-compat`; the dynamic world entry is a third chunk.
- Vite content hashes provide safe cache busting. `netlify.toml` sets a one-year immutable cache for `/assets/*`, no-cache revalidation for `/` and `/index.html`, and a one-day cache for `/profile.png`.
- The 3D world starts in the background on desktop while the onboarding dialog is open. The phone path exits before dynamically importing the world module.
- `src/world/create-world.js` throttles label projection/occlusion checks to 10 Hz and skips them outside walk mode. The render loop retains fixed 60 Hz physics with a bounded catch-up accumulator.

## Handoff status and next review

`npm run check` and `npm run build` passed in this pass. A small Rapier runtime probe confirmed the moving bus collider API works. Road centerline sampling leaves at least 9 m to building centers and at least 3.1 m to tree centers; the bus now has clearance while following the perimeter. The expected Rapier chunk-size warning remains. No automated browser smoke flow was run and a live browser preview was unavailable. For the next visual review, inspect the welcome dialog, walking, rides in both loop directions, arrival/disembarkation, and phone map taps.
