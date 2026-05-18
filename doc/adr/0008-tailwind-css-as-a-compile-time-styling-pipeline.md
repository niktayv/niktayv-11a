# ADR-0008: Tailwind CSS As A Compile-Time Styling Pipeline

## Status

Accepted

## Context

The site needs a consistent utility-based styling system without adding a runtime CSS layer. The current build compiles `src/assets/css/tailwind.css` through PostCSS and Tailwind into a static stylesheet in `dist/assets/`.

Runtime style generation would add unnecessary client and build complexity for a site whose pages are otherwise statically rendered.

## Decision

We will use Tailwind CSS through a compile-time PostCSS pipeline to generate the site's stylesheet.

## Consequences

Styling remains part of the static build and ships as plain CSS. This fits the static-site architecture and keeps the browser runtime simple.

Contributors must remember that some class tokens live in shared data files as well as templates, so styling changes are not limited to markup files alone.
