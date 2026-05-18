# ADR-0014: Passthrough Asset Copy Instead Of JavaScript Bundling

## Status

Accepted

## Context

The project serves images, video, SVGs, a small local script, and a vendored Alpine distribution. These assets do not currently require a richer JavaScript bundling pipeline for module graph optimization or code splitting.

Adding a bundler would expand the toolchain without solving a pressing need in the present architecture.

## Decision

We will copy static assets into the output through Eleventy passthrough rules instead of introducing a JavaScript bundler as part of the main build.

## Consequences

The build stays easier to understand and closer to the actual asset layout. Small client-side additions can remain lightweight and explicit.

If the client-side surface grows materially, this decision may need to be revisited. For now, passthrough copying is the simpler and more proportionate approach.
