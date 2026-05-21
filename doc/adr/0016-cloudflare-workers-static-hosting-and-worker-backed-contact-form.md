# ADR-0016: Cloudflare Workers Static Hosting And Worker-Backed Contact Form

## Status

Accepted

Supersedes `doc/adr/0012-netlify-as-static-host-with-forms-integration.md`.

## Context

The site remains a static Eleventy build, but Netlify's current credit-based hosting model is no longer a good operational fit for this repository. The build already produces a clean `dist/` artifact, so the main migration need is a new static hosting target plus a replacement for the Netlify Forms dependency on `src/contact.njk`.

Cloudflare Workers Static Assets can publish the generated `dist/` output without changing the Eleventy or PostCSS architecture. A small Worker can also handle `POST /api/contact`, verify Turnstile tokens, and send contact emails through Cloudflare Email Service without introducing a separate application server.

## Decision

We will publish the generated `dist/` artifact through Cloudflare Workers Static Assets using `wrangler.jsonc` and manual Wrangler CLI deploys.

We will replace the Netlify-specific contact form integration with a Worker endpoint at `POST /api/contact`. The contact page will render a Turnstile widget at build time, and the Worker will validate the submitted token and send the message through the `EMAIL` binding.

## Consequences

The site keeps its existing static build contract while moving to a hosting model that supports manual build-and-deploy operations through Wrangler. The contact workflow remains available without reintroducing a larger backend runtime.

This creates a new operational contract around Wrangler configuration, Cloudflare secrets, Email Service setup, and build-time environment variables such as `URL` and `TURNSTILE_SITE_KEY`. Contributors must keep the static build environment and the Worker runtime bindings aligned when previewing and deploying the site.
