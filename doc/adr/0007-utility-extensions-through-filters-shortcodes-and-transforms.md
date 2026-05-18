# ADR-0007: Utility Extensions Through Filters, Shortcodes, And Transforms

## Status

Accepted

## Context

The site needs reusable formatting and content-construction helpers, including date formatting, author lookup, HTML transforms, and richer authored blocks such as video embeds and multi-column content. Eleventy provides extension points for exactly these concerns.

Duplicating this logic inline in templates would make presentation harder to maintain and would spread architectural behavior across many files.

## Decision

We will encapsulate reusable build-time behavior in Eleventy filters, shortcodes, paired shortcodes, and transforms, primarily under `utils/`.

## Consequences

Shared logic gets one implementation point and can be reused across templates and content. This keeps authored files cleaner and makes build behavior easier to test mentally.

The cost is that some rendering behavior becomes indirect. Contributors need to know when a value is shaped by a helper rather than by template markup alone.
