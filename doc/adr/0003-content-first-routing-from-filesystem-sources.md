# ADR-0003: Content-First Routing From Filesystem Sources

## Status

Accepted

## Context

The site's routes map naturally to authored pages, posts, tags, feeds, and derived author views. In this model, the filesystem is already the most direct representation of the public information architecture.

A separate route registry would duplicate what Eleventy can infer from content files, frontmatter, and pagination metadata.

## Decision

We will define primary routes through source files in `src/`, with frontmatter and Eleventy pagination controlling derived routes where needed.

## Consequences

Content structure and URL structure remain closely aligned, which makes the site easy to navigate and maintain. Adding or changing a route usually means editing a content or template file instead of coordinating a separate routing layer.

Route-wide changes still require discipline because permalink and pagination behavior can create derived pages that are not obvious from a quick directory scan.
