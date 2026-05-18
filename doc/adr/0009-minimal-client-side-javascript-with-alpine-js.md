# ADR-0009: Minimal Client-Side JavaScript With Alpine.js

## Status

Accepted

## Context

Most pages are static and do not need application-style hydration. The small amount of interaction that does exist, such as the mobile navigation toggle, can be handled with lightweight client code.

Using a heavier client framework would be disproportionate to the site's interactive needs and would weaken the static-first model.

## Decision

We will keep client-side JavaScript minimal and use Alpine.js for small interactive behaviors where declarative inline state is sufficient.

## Consequences

The browser runtime remains small and easy to reason about. Interaction can be added without introducing a full client application architecture.

This decision also constrains future feature design. If a new requirement demands substantial client state, that change should be treated as a real architectural shift rather than a casual incremental addition.
