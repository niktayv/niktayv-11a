# niktayv-11a

Personal Eleventy site for Yuri Vyatkin. The project is a static site deployed to Netlify, with Tailwind CSS for styling and Alpine.js for light client-side interaction.

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

The repository pins Node through `.node-version`, and Netlify should respect that same runtime during builds.

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

Netlify remains the deployment target.

- Build command: `npm run build`
- Publish directory: `dist`
- Node version: sourced from `.node-version` or a matching `NODE_VERSION` environment variable in Netlify

## Maintenance Notes

- Tailwind class tokens also live in `src/_data/*.js`, not only in templates, so styling changes should consider both places.
- Syntax highlighting CSS is kept in `src/assets/css/prism-okaidia.css` and is inlined from the base layout during the Eleventy build.
- Netlify Forms markup lives in `src/contact.njk`; test it after any contact-form styling or markup changes.
