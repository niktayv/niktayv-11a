# niktayv-11a

Personal Eleventy site for Yuri Vyatkin. The project is a static site built with Tailwind CSS and Alpine.js, published to Cloudflare Workers Static Assets with a small Worker endpoint for contact-form handling.

## Architecture

- `src/` contains pages, posts, assets, and all site source content.
- `src/_data/` contains site metadata, color tokens, and structural configuration consumed by templates.
- `src/_includes/` contains Nunjucks layouts, partials, and reusable components.
- `utils/` contains Eleventy filters, shortcodes, paired shortcodes, and transforms registered in `.eleventy.js`.
- `.eleventy.js` is the build integration point for Eleventy collections, plugins, passthrough copies, markdown configuration, and output behavior.
- `src/assets/css/tailwind.css` is the Tailwind entrypoint compiled by PostCSS to `dist/assets/tailwind.css`.
- `src/assets/scripts/main.js` is a lightweight site bootstrap file. Alpine is copied from `node_modules` into the published output by Eleventy; no additional JavaScript bundling is required.
- Hero heading and subheading values are treated as plain text from frontmatter, not trusted HTML. If you ever need rich markup there, add an explicit sanitization step instead of reintroducing raw `safe` output.

## Requirements

- Node `24`
- npm `11` or the npm version that ships with Node 24

The repository pins Node through `.node-version`, and the manual Cloudflare build/deploy flow should use that same runtime during builds.

## Development

Install dependencies:

```bash
npm install
```

Start local development:

```bash
npm run dev
```

Create a production build:

```bash
npm run build
```

## Deployment

Cloudflare Workers is the deployment target.

- Static assets are built into `dist/`.
- `wrangler.jsonc` points Workers Static Assets at `dist/` and binds the Worker entrypoint at `worker/index.js`.
- `POST /api/contact` is handled by the Worker; all normal pages and assets are served from `dist/`.

This repo now uses the `.env*` file family for build inputs and `APP_ENV` to choose which env file set should be loaded.

Use:

- `.env.local` for local preview and test keys
- `.env.production.local` for production build inputs

Start by copying the committed templates:

```bash
cp .env.local.example .env.local
cp .env.production.local.example .env.production.local
```

Example local env file:

```bash
URL="https://niktayv.test"
TIMEZONE="Pacific/Auckland"
TURNSTILE_SECRET_KEY="1x0000000000000000000000000000000AA"
TURNSTILE_SITE_KEY="1x00000000000000000000AA"
CONTACT_EMAIL_FROM="no-reply@niktayv.com"
CONTACT_EMAIL_TO="contact-form@niktayv.com"
```

Run the local Cloudflare workflow with:

```bash
APP_ENV=local npm run cf:build
APP_ENV=local npm run cf:dev
```

`APP_ENV` defaults to `local`, so `npm run cf:build` and `npm run cf:dev` use the local env files even when the prefix is omitted.

Run the production build and deploy workflow with:

```bash
APP_ENV=production npm run cf:build
APP_ENV=production npm run cf:deploy
```

Important:

- do not keep legacy `.dev.vars*` files in the repo root
- Wrangler prefers `.dev.vars*` over `.env*`, so stale `.dev.vars` files will override this workflow
- `TURNSTILE_SECRET_KEY` stays a real Cloudflare Worker secret for deployed traffic

Preview locally through Wrangler:

```bash
APP_ENV=local npm run cf:dev
```

Deploy production:

```bash
APP_ENV=production npm run cf:deploy
```

For the full manual production runbook and post-deploy checklist, see `doc/deploy/DEPLOYMENT.md`.

For deployed contact-form traffic, set the Worker secret in Cloudflare:

```bash
npx wrangler secret put TURNSTILE_SECRET_KEY
```

Turnstile provisioning requirements:

- Create or reuse a Turnstile widget for `niktayv.com`.
- Add `www.niktayv.com` too if that hostname may serve the contact page.
- Use the widget `sitekey` as `TURNSTILE_SITE_KEY`.
- Store the widget secret with `wrangler secret put TURNSTILE_SECRET_KEY`.

The `EMAIL` binding in `wrangler.jsonc` requires:
- Cloudflare Email Service / Email Sending to be enabled for the domain.
- A verified sender that matches `CONTACT_EMAIL_FROM`.

## Maintenance Notes

- Tailwind class tokens also live in `src/_data/*.js`, not only in templates, so styling changes should consider both places.
- Syntax highlighting CSS is kept in `src/assets/css/prism-okaidia.css` and is inlined from the base layout during the Eleventy build.
- `src/contact.njk` depends on the build-time `TURNSTILE_SITE_KEY`, and the Worker in `worker/index.js` depends on the runtime `TURNSTILE_SECRET_KEY` plus the `EMAIL` binding. Test the full contact flow after any form or Worker change.
