# ADR-0004: Nunjucks Layouts And Components As The View Layer

## Status

Accepted

## Context

The site needs reusable page chrome, post rendering, navigation, hero variants, and list presentations, but it does not need a reactive component framework for most screens. The existing codebase already expresses the view layer through Nunjucks layouts, partials, and components.

Introducing a second primary rendering system would increase complexity and create split ownership of presentation concerns.

## Decision

We will use Nunjucks layouts, partials, and components in `src/_includes/` as the main view layer for shared presentation.

## Consequences

Presentation stays composable without requiring a heavier client framework. Most UI changes can be made by editing templates and frontmatter-driven component inputs.

This favors server-side composition over client-side interactivity. If a future feature needs richer stateful behavior, it should justify itself explicitly instead of displacing the template system by default.
