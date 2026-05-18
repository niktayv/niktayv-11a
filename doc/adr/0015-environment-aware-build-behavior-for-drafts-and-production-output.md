# ADR-0015: Environment-Aware Build Behavior For Drafts And Production Output

## Status

Accepted

## Context

Authors need to preview draft content locally while keeping unfinished material out of production output. The current build differentiates development and production behavior, especially around the `post` collection and production-oriented build steps.

A single undifferentiated build mode would either hide drafts during authoring or risk publishing them accidentally.

## Decision

We will keep build behavior environment-aware so local development can expose draft content while production builds exclude it and apply production output settings.

## Consequences

The authoring workflow stays practical without weakening the publication boundary. Local previews and production deploys can optimize for different needs while using the same source content.

This requires contributors to be precise about environment names and production-only behavior. Build logic that depends on environment should remain explicit and narrowly scoped.
