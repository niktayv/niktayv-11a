# Deployment

Manual production deployment runbook for the Cloudflare Workers version of `niktayv.com`.

## Scope

This runbook covers the current production setup:

- Static site assets built into `dist/`
- Worker entrypoint in `worker/index.js`
- Contact form served from `src/contact.njk`
- Turnstile validation plus email delivery through Cloudflare bindings

## Prerequisites

Before deploying, confirm all of the following:

- `niktayv.com` is already attached to the Worker as the production custom domain.
- Wrangler is authenticated on this machine.
- Cloudflare Turnstile is provisioned for `niktayv.com`.
- The real production Turnstile `sitekey` is available.
- The real production Turnstile secret is available.
- Cloudflare Email Service / Email Sending is enabled for the domain.
- `contact-form@niktayv.com` is an allowed destination address for the Worker email binding.
- The destination route for `contact-form@niktayv.com` is working in Cloudflare Email Routing.
- The sender address configured for the Worker is verified for Cloudflare email sending.

## Current Production Config Contract

The checked-in configuration expects:

- `URL=https://niktayv.com`
- `TIMEZONE=Pacific/Auckland`
- build-time `TURNSTILE_SITE_KEY`
- runtime secret `TURNSTILE_SECRET_KEY`
- `CONTACT_EMAIL_FROM=no-reply@niktayv.com`
- `CONTACT_EMAIL_TO=contact-form@niktayv.com`

Important:

- Local test configuration belongs in `.env.local`.
- Production build configuration belongs in `.env.production.local`.
- Do not deploy with the Turnstile test keys used for local testing.
- The production build must use the real production `TURNSTILE_SITE_KEY`.
- `wrangler.jsonc` declares `TURNSTILE_SECRET_KEY` as a required secret, so deploy will fail fast if it is missing on the Worker.
- Do not keep `.dev.vars*` files in the repo root. Wrangler prefers them over `.env*` files.

## Pre-Deploy Checks

Run these from the repository root.

1. Confirm Wrangler auth:

```bash
npx wrangler whoami
```

2. Confirm the Worker secret exists:

```bash
npx wrangler secret list
```

Expected:

- `TURNSTILE_SECRET_KEY` appears in the list.

If it is missing, set it before continuing:

```bash
npx wrangler secret put TURNSTILE_SECRET_KEY
```

Note:

- Cloudflare currently documents that `wrangler secret put` creates and deploys a new Worker version immediately.

3. Confirm `.env.production.local` exists and contains the production build values:

```bash
URL="https://niktayv.com"
TIMEZONE="Pacific/Auckland"
TURNSTILE_SITE_KEY="<production-turnstile-site-key>"
CONTACT_EMAIL_FROM="no-reply@niktayv.com"
CONTACT_EMAIL_TO="contact-form@niktayv.com"
```

Expected:

- the file contains real production values
- no local test-key placeholders are used

4. Confirm the repo builds cleanly with production values:

```bash
APP_ENV=production npm run cf:build
```

## Deploy

Deploy using the production env selection:

```bash
APP_ENV=production npm run cf:deploy
```

What this does:

- runs `npm run cf:check-env`
- runs `npm run build`
- runs `wrangler deploy`

## Immediate Post-Deploy Verification

Open these pages in a browser:

- `https://niktayv.com/`
- `https://niktayv.com/contact/`
- `https://niktayv.com/feed.xml`
- a real post URL
- a missing URL such as `https://niktayv.com/does-not-exist`

Expected:

- the homepage renders
- assets load correctly
- `/contact/` renders the live form
- the Turnstile widget appears
- feed and post pages load normally
- a missing page returns the generated `404` page

## Contact Form Verification

Run one valid production-path submission:

1. Open `https://niktayv.com/contact/`
2. Fill the form
3. Complete Turnstile
4. Submit

Expected:

- browser redirects to `https://niktayv.com/thankyou/`
- the message reaches the destination configured behind `contact-form@niktayv.com`

Then run one invalid-path check:

1. Submit without completing Turnstile

Expected:

- browser redirects back to `/contact/?status=invalid`
- the error banner appears above the form

## Optional Live Logs

Tail the Worker during verification:

```bash
npx wrangler tail
```

Use this while sending the real contact-form test submission so any Turnstile or email-binding failures are visible immediately.

## One-Shot Checklist

Use this as the live checklist during a deploy:

- `npx wrangler whoami` succeeds
- `npx wrangler secret list` shows `TURNSTILE_SECRET_KEY`
- `.env.production.local` contains the real production Turnstile `sitekey`
- production Turnstile secret is already set on the Worker
- email sender verification is complete
- email routing for `contact-form@niktayv.com` is active
- `APP_ENV=production npm run cf:build` succeeds
- `APP_ENV=production npm run cf:deploy` succeeds
- homepage loads on `https://niktayv.com/`
- `/contact/` shows the live form and Turnstile widget
- one valid contact submission reaches `/thankyou/`
- the contact email arrives at the routed destination
- one invalid submission returns `/contact/?status=invalid`

## Known Failure Modes

- All submissions fail immediately:
  - most likely Turnstile `sitekey` and `TURNSTILE_SECRET_KEY` do not match
- Form loads but no mail arrives:
  - most likely Cloudflare Email Sending or Email Routing configuration issue
- Deploy fails before upload:
  - likely missing required secret or missing production build variables

## Related Files

- `wrangler.jsonc`
- `worker/index.js`
- `src/contact.njk`
- `scripts/validate-cloudflare-build-env.js`
- `README.md`
