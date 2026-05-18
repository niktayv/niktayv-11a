# ADR-0011: Generated Output Published As Static Dist Assets

## Status

Accepted

## Context

Eleventy and the CSS pipeline both converge on a generated output directory. The build already treats `dist/` as the publishable artifact for local verification and hosting.

Publishing from source files directly would blur the boundary between authored input and generated output.

## Decision

We will treat `dist/` as the generated deployment artifact and keep source files and published output as distinct concerns.

## Consequences

The build has a clear contract: inputs live in source directories and outputs live in `dist/`. Hosting, previews, and deployment can target one generated directory consistently.

Contributors must avoid treating `dist/` as a source of truth. Changes belong in source files and build configuration, not in the generated output.
