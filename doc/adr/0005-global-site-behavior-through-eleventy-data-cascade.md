# ADR-0005: Global Site Behavior Through Eleventy Data Cascade

## Status

Accepted

## Context

The site combines page-level frontmatter with cross-cutting values such as metadata, structure settings, authors, and theme tokens. Eleventy already provides a data cascade that merges local and global data for template consumption.

Alternative configuration channels would either duplicate Eleventy data flow or make the source of truth less obvious.

## Decision

We will use Eleventy's data cascade as the primary mechanism for passing global and per-page behavior into templates.

## Consequences

Templates can stay relatively declarative because they consume a merged view of page data and shared configuration. Site-wide behavior is easier to adjust centrally without rewriting each page.

The tradeoff is that contributors must understand where a value enters the cascade. Documentation and naming in `_data` remain important to keep the merged context legible.
