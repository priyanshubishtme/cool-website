# Deployment guide

This portfolio is a static Vite site. It needs no application server, database, credentials, or runtime environment variables. The built files in `dist/` can be served by any static host that supports the history fallback described below.

## Before publishing

1. Install the project dependencies with `npm ci`.
2. Run `npm run check` and `npm test` locally.
3. Run `npm run build` and review the production build with `npm run preview`.
4. Check the home page, project detail pages, contact links, mobile layout, and browser refresh on a nested route.
5. Add `resume.pdf` to the project root only when Priyanshu's real PDF is available. The current resume link is designed to show an honest message while it is absent.

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

## Runtime and hosting notes

- Serve the built site over HTTPS in production. The interactive scene uses WebGL; browsers that cannot initialize it fall back to the illustrated town and ordinary HTML navigation.
- Vite emits source maps and currently reports a large world chunk because the 3D world includes Rapier physics. The browser loads that world as a separate module; the semantic portfolio and navigation remain the useful fallback if it fails.
- No secrets or server-side environment variables are used by the site.
- The browser smoke test needs a local Chrome installation at the path documented in the README. This is a development check; the deployed site does not need Chrome or Node at runtime.
- Books and Notes remain honest empty states until real content is supplied. Do not add placeholder books, notes, project evidence, or a fake resume PDF as part of deployment.

## Rollback

Redeploy the previous successful static build from the hosting provider's deploy history. For a local release archive, retain the complete `dist/` directory from that build so the HTML and hashed assets stay paired.
