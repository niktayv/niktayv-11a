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

For local preview, put your Cloudflare build and Worker values in `.dev.vars`:

```bash
URL="https://niktayv.com"
TIMEZONE="Pacific/Auckland"
TURNSTILE_SITE_KEY="<your-turnstile-site-key>"
CONTACT_EMAIL_FROM="contact-form@niktayv.com"
CONTACT_EMAIL_TO="contact-form@niktayv.com"
```

`npm run cf:build` and `wrangler dev` both load `.dev.vars` locally. For production deploys, set the corresponding runtime vars and secrets in Cloudflare.

Preview locally through Wrangler:

```bash
npm run cf:dev
```

Deploy production:

```bash
npm run cf:deploy
```

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
