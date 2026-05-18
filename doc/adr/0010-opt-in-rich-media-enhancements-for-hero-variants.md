# ADR-0010: Opt-In Rich Media Enhancements For Hero Variants

## Status

Accepted

## Context

The homepage and selected pages support richer presentation patterns such as hero carousels and video backgrounds. Those features benefit from specialized assets and scripts, but only a subset of pages needs them.

Loading all rich-media dependencies for every page would work against the site's otherwise lean static model.

## Decision

We will keep rich-media behavior opt-in at the template level and load supporting assets only for pages that explicitly select those hero variants.

## Consequences

Pages without rich-media needs stay lighter and simpler. The architecture preserves expressive presentation without making advanced media the default runtime burden.

This creates some branching in the base layout and component system, but that complexity is preferable to paying for unused behavior across the whole site.
