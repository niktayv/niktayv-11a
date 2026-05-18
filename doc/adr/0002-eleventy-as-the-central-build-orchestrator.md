# ADR-0002: Eleventy As The Central Build Orchestrator

## Status

Accepted

## Context

The project needs a static-site generator that can compose Markdown content, Nunjucks templates, shared data, collections, and light custom build logic. The current codebase already concentrates those concerns in `.eleventy.js` and the `utils/` helpers.

Using multiple overlapping build orchestrators would fragment responsibility between content generation, layout rendering, and site metadata assembly.

## Decision

We will use Eleventy as the central build orchestrator for page generation, content collections, templating, filters, shortcodes, transforms, and output assembly.

## Consequences

The site architecture has a clear integration point in `.eleventy.js`, which simplifies reasoning about build behavior. Most architectural extensions should plug into Eleventy rather than bypassing it.

This also means Eleventy conventions shape the rest of the system. Changes that cut across content, templates, or generated output will usually be expressed as Eleventy configuration rather than standalone tooling.
