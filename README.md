# Fortuna Salong Website

Static marketing site for Fortuna Salong (fortunasalong.se), built with Bun and prop-for-that, deployed to GitHub Pages.

## Stack

- **Bun** — install, HTML bundler, and static build
- **prop-for-that** — viewport/visibility as CSS custom properties
- **Tailwind CSS v4** via `bun-plugin-tailwind`
- Content driven by [`config.json`](config.json)

## Local development

```bash
bun install
bun run scripts/build.ts --dev   # generate src/index.html from config
bun ./src/index.html             # Bun HTML dev server
```

Or:

```bash
bun run dev
```

## Production build

```bash
bun run build
```

Output is written to `dist/` (includes `CNAME`, `.nojekyll`, and `merchant-feed.xml`).

## Content

- Edit site copy, SEO, services, and contact in `config.json`
- Drop gallery images in `public/imgs/` — they are picked up on the next build

## GitHub Pages

PRs run a Bun build check (no deploy). Push to `main` builds and deploys via [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml). Optional secret `GOOGLE_SITE_VERIFICATION` is inlined as site verification.
