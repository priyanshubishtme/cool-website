# Deployment guide

This portfolio is a static Vite site. It needs no application server, database, credentials, or runtime environment variables. The built files in `dist/` can be served by any static host that supports the history fallback described below.

## Before publishing

1. Install the project dependencies with `npm ci`.
2. Run `npm run check` and `npm test` locally.
3. Run `npm run build` and review the production build with `npm run preview`.
4. Check the home page, project detail pages, contact links, phone road map, desktop welcome dialog, bus travel clear of building footprints, avatar visibility during a ride, and browser refresh on a nested route.
5. Add `public/resume.pdf` only when Priyanshu's real PDF is available. The current resume link is designed to show an honest message while it is absent.

The build output is `dist/`. Deploy the contents of that directory, not the source directory. Rebuild after source changes; do not hand-edit generated bundle filenames or HTML in `dist/`.

## Netlify

The repository includes `netlify.toml` with the production settings already configured:

- Build command: `npm run build`
- Publish directory: `dist`
- Rewrite all routes to `/index.html` with status `200`

To deploy, connect the repository to Netlify and leave those build and publish settings in place. Netlify installs dependencies from the lockfile and builds the static site. For a manual deployment, run `npm ci` and `npm run build`, then publish the generated `dist/` directory. The same rewrite must remain enabled for deploy previews and production so routes such as `/projects/ashapure` load directly and survive refresh.

## Other static hosts

Configure the host's single-page application/history fallback so an unknown request path is served from `/index.html` with a successful response. Keep actual assets such as `/assets/...`, `/style.css`, and `/resume.pdf` available at their real paths. This lets the client router render direct links such as `/about` and `/projects/arena-self-driving`.

Set the site's base path to `/` when publishing at a domain root, which is the configuration used by this repository. If deploying below a path prefix, update the Vite base and the app's absolute route and asset paths together before publishing; a host rewrite alone does not make a subdirectory deployment work.

## Asset caching and bundle loading

The Vite build writes content-hashed files under `dist/assets/`. `vite.config.js` keeps Three.js, Rapier, and the world entry in separate chunks. When one changes, unrelated chunks keep their filenames so browsers and CDNs can reuse their cached copies. The physical world is attempted on desktop and mobile; the HTML/CSS town is used only when WebGL or world initialization fails, or when the visitor explicitly chooses `Browse without 3D`.

`netlify.toml` serves `/assets/*` with `Cache-Control: public, max-age=31536000, immutable`. The root and `/index.html` are revalidated on each visit so they can point to the newest chunk hashes. The public portrait gets a one-day cache. Preserve these rules when moving to another host; set equivalent headers for hashed assets and HTML.

Rapier remains a large compressed download (about 1.6 MB gzip in the current build). Chunking makes it independently cacheable, but does not reduce the first desktop download. Keep it off the phone path and consider a lighter physics implementation only if the desktop load budget requires it.

## Runtime and hosting notes

- Serve the built site over HTTPS in production. Browsers with WebGL load the physical Three.js/Rapier scene first, including phone-sized viewports. Browsers that cannot initialize WebGL, or encounters an initialization error, fall back to the clickable HTML/CSS illustrated town and ordinary HTML navigation. The fallback can also be selected manually with `Browse without 3D`.
- Vite emits source maps. The world entry, Three.js, and Rapier are separate dynamic chunks. Rapier is still over Vite's 500 kB warning threshold, even after chunking; its hashed chunk can be cached separately. Desktop browsers load these modules; phone sized viewports intentionally skip them and use the CSS road map. Semantic portfolio navigation remains available if the module fails.
- No secrets or server-side environment variables are used by the site.
- The browser smoke test needs a local Chrome installation at the path documented in the README. This is a development check; the deployed site does not need Chrome or Node at runtime.
- Books and Notes remain honest empty states until real content is supplied. Do not add placeholder books, notes, project evidence, or a fake resume PDF as part of deployment.

## Rollback

Redeploy the previous successful static build from the hosting provider's deploy history. For a local release archive, retain the complete `dist/` directory from that build so the HTML and hashed assets stay paired.
