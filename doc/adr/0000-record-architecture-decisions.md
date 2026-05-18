# ADR-0000: Record Architecture Decisions

## Status

Accepted

## Context

This project already carries architectural intent in code, templates, build scripts, and a small set of top-level documents. That intent is discoverable, but the reasoning behind important technical choices is still easy to lose over time. As the site evolves, future contributors need a durable record of why the architecture looks the way it does, not just how it works today.

Michael Nygard's article "Documenting Architecture Decisions" argues for small, sequential, repository-local architecture decision records that explain context, decision, and consequences. That approach fits this project better than a single large architecture document because the site is small, the decisions are discrete, and the rationale should change incrementally with the codebase.

## Decision

We will keep architecture decision records in the repository under `doc/adr/` using Markdown files. Each ADR will describe one architecturally significant decision using the sections `Status`, `Context`, `Decision`, and `Consequences`.

We will number ADRs sequentially and monotonically using four digits in the filename. Numbers will not be reused. If a later decision replaces an earlier one, the older ADR will remain in the repository and will be marked as superseded by the newer record.

## Consequences

The rationale for major technical choices becomes part of the codebase and can evolve with it. Future changes can refer to explicit prior decisions instead of inferring intent from implementation details.

This adds a small documentation maintenance cost. The cost is acceptable because the documents are short, local to the repository, and easier to update than a centralized architecture narrative.
