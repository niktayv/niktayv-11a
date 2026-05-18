# ADR-0006: Configuration-Driven Theming Via Data

## Status

Accepted

## Context

This site exposes many presentational choices through shared data files such as `colors.js`, `structure.js`, and `meta.js`. That approach allows broad customization without editing every template instance.

Hard-coding all design choices inside templates would make the site more brittle and would weaken the existing pattern of centralized visual control.

## Decision

We will keep theme, structure, and selected site-level presentation controls in shared `_data` files rather than distributing those choices only across templates.

## Consequences

High-level design adjustments can be made from a few central files, which is useful for a small site with repeated presentation patterns. The architecture remains intentionally configuration-oriented.

This also means `_data` files are architectural, not merely content-like. Styling and layout changes must account for these files as part of the view system.
