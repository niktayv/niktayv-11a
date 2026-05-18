# ADR-0013: Derived Author Tag Feed And Blog Pages From Collections

## Status

Accepted

## Context

The site publishes repeated derived views over the same core content set, including blog listings, tag pages, author pages, and the Atom feed. Eleventy collections and pagination already provide the mechanism for shaping those views from common inputs.

Manually curating each derived page would duplicate content structure and increase the risk of drift.

## Decision

We will derive blog, tag, author, and feed outputs from shared content collections instead of maintaining those views as manually duplicated content.

## Consequences

The site's secondary views stay synchronized with the underlying posts and metadata. Adding new content updates multiple public surfaces automatically.

Collection behavior becomes architecturally important. Changes to filtering, pagination, or draft handling can affect several outputs at once and should be treated carefully.
