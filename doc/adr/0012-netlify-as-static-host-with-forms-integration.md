# ADR-0012: Netlify As Static Host With Forms Integration

## Status

Accepted

## Context

The site needs a straightforward static hosting target and includes a contact form that benefits from a hosted submission backend. The existing deployment flow and form markup are already aligned with Netlify.

Operating a custom backend only for contact submissions would add infrastructure that the site otherwise does not need.

## Decision

We will deploy the site as static assets on Netlify and use Netlify Forms for the contact form integration.

## Consequences

Hosting stays operationally simple while preserving a functional contact workflow. The project can remain mostly backend-free without dropping the form feature.

This creates a platform coupling around deployment conventions and form markup. Any future migration away from Netlify will need an explicit replacement for both hosting and form handling.
