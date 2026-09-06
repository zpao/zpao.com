<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Project architecture

- This is a fully static Next.js App Router export hosted on DreamHost. There is no production Node.js server, Vercel integration, or runtime image service.
- Routes live in `src/app/`. Pages are build-time Server Components; keep Markdown parsing and content loading out of client bundles.
- Posts live in `src/content/posts/<slug>/index.md` and retain public URLs at `/posts/<slug>/`. Keep local post images beside their Markdown.
- Markdown preserves raw HTML, smart punctuation, Prism syntax and line highlighting, and Gist shorthand (`gist:owner/id#filename`). Gists are fetched at build time and cached in `.cache/gists/`; a clean cache requires GitHub network access.
- Responsive PNG/JPEG variants are generated locally with Sharp. Originals and animated GIFs are retained.
- StyleX design tokens live in `src/styles/tokens.stylex.ts`; semantic content and Markdown components live under `src/components/`. `src/css/global.css` is limited to the document reset and StyleX entrypoint.
- `public/` contains standalone files such as the résumé and examples. Post-local assets are copied there during preparation; restart the dev server after changing those assets.

## Local commands

Use Node.js 22 LTS or newer and the pnpm version pinned in `package.json`.

- `pnpm dev` prepares static assets and starts Next.js development.
- `pnpm test` runs the unit tests.
- `pnpm run typecheck` checks TypeScript without emitting files.
- `pnpm build` prepares assets and `.htaccess`, then exports the site to `out/`.
- `pnpm verify` validates the exported routes, feeds, assets, Apache rules, styles, and standalone files.

## Deployment safety

`pnpm deploy` and `pnpm rsync` modify the live DreamHost site. Never run either command without explicit user authorization. A plain HTTP preview does not exercise `.htaccess`; test HTTPS redirects and the custom 404 on Apache.
