# ADR-0001: Static Site Generation Over App-Style Runtime

## Status

Accepted

## Context

This repository serves a personal website and technical blog. Most content is editorial and changes at authoring time rather than at request time. The site does not require authenticated user flows, per-request personalization, or a server-owned application state model.

An app-style runtime would introduce server complexity, request-time failure modes, and a larger operational surface without solving a current product problem.

## Decision

We will generate the site ahead of time as static files instead of building it as a server-rendered or client-heavy web application.

## Consequences

The site stays simple to host, cache, and deploy. Most failures move from request time to build time, which is easier to reason about for this project.

Dynamic capabilities must either be omitted, handled by external hosted integrations, or added very selectively so they do not turn the site into an application runtime by accident.
