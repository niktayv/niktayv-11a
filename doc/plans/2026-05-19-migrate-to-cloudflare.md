# Plan: Migrate `niktayv-11a` To Cloudflare Workers

## Summary

Move the site from Netlify to Cloudflare Workers Static Assets, keep the Eleventy and PostCSS build unchanged, and replace Netlify Forms with a Worker-backed contact submission flow.

## Implementation Changes

- Hosting and deploy contract
  - Add `wrangler.jsonc` with a Worker entrypoint at `worker/index.js`.
  - Serve `dist/` through Workers Static Assets with `404-page` handling.
  - Add npm scripts for Cloudflare preview, staging deploy, and production deploy.
  - Remove `netlify.toml` once the Cloudflare config is in place.
- Contact form migration
  - Replace Netlify-specific form markup in `src/contact.njk` with a standard form that posts to `POST /api/contact`.
  - Render the Turnstile widget from the build-time `TURNSTILE_SITE_KEY`.
  - Verify Turnstile server-side in the Worker with `TURNSTILE_SECRET_KEY`.
  - Send the contact message through the `EMAIL` binding, then redirect to `thankyou` on success or back to `contact` with an error status on failure.
- Docs and architecture
  - Add ADR-0016 for the Cloudflare hosting and Worker-backed contact decision.
  - Mark ADR-0012 as superseded by ADR-0016.
  - Update `README.md` so the deployment flow, required shell variables, Wrangler secret, and contact-form ownership all reflect Cloudflare.

## Public Interfaces And Config

- New config file: `wrangler.jsonc`
- New Worker route: `POST /api/contact`
- New scripts
  - `npm run cf:check-env`
  - `npm run cf:build`
  - `npm run cf:dev`
  - `npm run cf:deploy`
- Required configuration
  - Build-time shell variables: `URL`, `TIMEZONE`, `TURNSTILE_SITE_KEY`, `CONTACT_EMAIL_FROM`, `CONTACT_EMAIL_TO`
  - Worker secret: `TURNSTILE_SECRET_KEY`
  - Worker binding: `EMAIL`

## Verification

- Build verification
  - Run `npm run build`
  - Confirm `dist/` contains the expected site output, including posts, feed, assets, and `404.html`
- Local Cloudflare verification
  - Set the required shell variables
  - Run `npm run cf:dev`
  - Verify `GET /`, a post page, `/feed.xml`, `/contact/`, and a missing path
  - Verify `POST /api/contact` rejects missing or invalid Turnstile tokens
- Production cutover
  - Build with `URL=https://niktayv.com`
  - Run `npm run cf:deploy`
  - Attach the custom domain and verify homepage, posts, feed, SSL, and contact delivery

## Assumptions

- The site remains a static Eleventy site with no SSR migration.
- Cloudflare Workers Static Assets is the hosting target; Cloudflare Pages is not used.
- Cloudflare Email Service is acceptable for contact notification delivery.
- The production canonical host remains `https://niktayv.com`.

## Update: Phased Rollout Decision

On 2026-05-19, the migration was deliberately split into two delivery phases to reduce cutover risk.

- Phase 1
  - Onboard `niktayv.com` to Cloudflare.
  - Deploy only the static website through Cloudflare Workers Static Assets.
  - Keep the contact page available as a static page, but do not expose a working submission form during this phase.
  - Remove form-specific deploy requirements from the immediate cutover path so production validation only depends on `URL` and `TIMEZONE`.
- Phase 2
  - Reintroduce the Worker-backed contact form.
  - Restore Turnstile configuration, server-side validation, and email delivery through Cloudflare bindings.
  - Re-verify the full contact submission flow separately after the static-site cutover is stable.

The current repository state now reflects the Phase 1 cutover path: the public contact page is a temporary static placeholder, while the Worker-based form integration remains deferred until Phase 2.

## Update: Phase 2 Completion

On 2026-05-21, the deferred contact flow was restored on top of the Cloudflare-hosted site.

- Restored the public contact form in `src/contact.njk`.
- Restored build-time requirements for `TURNSTILE_SITE_KEY`, `CONTACT_EMAIL_FROM`, and `CONTACT_EMAIL_TO`.
- Restored the `EMAIL` Worker binding in `wrangler.jsonc`.
- Re-enabled Turnstile validation and outbound email delivery in `worker/index.js`.
- Tightened Turnstile validation to require the expected hostname and action for the contact form flow.

Operational follow-up remains external to the repository: Cloudflare Turnstile widget provisioning, `TURNSTILE_SECRET_KEY` storage, and Email Service sender/domain setup must remain aligned with the checked-in configuration.
