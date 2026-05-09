---
version: alpha
name: Niktayv Editorial Contrast
description: >
  A restrained personal-site design system that pairs a cinematic, full-bleed
  hero with quiet editorial pages, system sans typography, slate neutrals, and
  teal-indigo interaction accents.
colors:
  primary: "#0F766E"
  on-primary: "#FFFFFF"
  primary-strong: "#134E4A"
  secondary: "#374151"
  secondary-muted: "#4B5563"
  tertiary: "#4338CA"
  neutral: "#FFFFFF"
  neutral-muted: "#F3F4F6"
  border: "#D1D5DB"
  border-strong: "#A5B4FC"
  background: "#FFFFFF"
  surface: "#FFFFFF"
  surface-subtle: "#F9FAFB"
  surface-tinted: "#E0E7FF"
  on-surface: "#374151"
  on-surface-muted: "#6B7280"
  footer: "#111827"
  on-footer: "#F3F4F6"
  hero-overlay: "#000000"
  inverse: "#111827"
  on-inverse: "#FFFFFF"
typography:
  display-xl:
    fontFamily: 'ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'
    fontSize: 3.75rem
    fontWeight: 600
    lineHeight: 1.05
    letterSpacing: -0.02em
  display-lg:
    fontFamily: 'ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'
    fontSize: 3rem
    fontWeight: 600
    lineHeight: 1.1
    letterSpacing: -0.02em
  headline-xl:
    fontFamily: 'ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'
    fontSize: 2.25rem
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: 'ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'
    fontSize: 1.875rem
    fontWeight: 800
    lineHeight: 1.2
    letterSpacing: -0.02em
  headline-md:
    fontFamily: 'ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'
    fontSize: 1.5rem
    fontWeight: 600
    lineHeight: 1.333
    letterSpacing: -0.01em
  body-lg:
    fontFamily: 'ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'
    fontSize: 1.125rem
    fontWeight: 400
    lineHeight: 1.667
  body-md:
    fontFamily: 'ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'
    fontSize: 1rem
    fontWeight: 400
    lineHeight: 1.5
  label-md:
    fontFamily: 'ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'
    fontSize: 0.875rem
    fontWeight: 500
    lineHeight: 1.25
  button-md:
    fontFamily: 'ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'
    fontSize: 1rem
    fontWeight: 500
    lineHeight: 1.5
  code-sm:
    fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace'
    fontSize: 0.875rem
    fontWeight: 400
    lineHeight: 1.25
rounded:
  sm: 0.375rem
  md: 0.5rem
  lg: 0.75rem
  full: 9999px
spacing:
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  "2xl": 48px
  "3xl": 64px
  hero-offset: 48px
  section-y: 48px
  page-gutter: 32px
  page-gutter-md: 64px
  page-gutter-lg: 128px
  card-gap: 32px
elevation:
  flat:
    shadow: none
  subtle:
    shadow: "0 1px 3px rgba(0, 0, 0, 0.10), 0 1px 2px rgba(0, 0, 0, 0.10)"
  raised:
    shadow: "0 10px 15px rgba(0, 0, 0, 0.10), 0 4px 6px rgba(0, 0, 0, 0.10)"
shadows:
  subtle: "0 1px 3px rgba(0, 0, 0, 0.10), 0 1px 2px rgba(0, 0, 0, 0.10)"
  raised: "0 10px 15px rgba(0, 0, 0, 0.10), 0 4px 6px rgba(0, 0, 0, 0.10)"
  hero-text: "0 1px 2px rgba(0, 0, 0, 0.25)"
motion:
  quick:
    duration: 150ms
    easing: "cubic-bezier(0.4, 0, 0.2, 1)"
  standard:
    duration: 150ms
    easing: "cubic-bezier(0.4, 0, 0.2, 1)"
opacity:
  hero-image-mobile: 0.5
  hero-image-desktop: 0.75
components:
  page-shell:
    backgroundColor: "{colors.background}"
    textColor: "{colors.on-surface}"
  nav-bar:
    backgroundColor: "{colors.neutral}"
    textColor: "{colors.secondary}"
  nav-link:
    textColor: "{colors.secondary}"
    typography: "{typography.label-md}"
    rounded: "{rounded.sm}"
    padding: "8px 12px"
  nav-link-active:
    backgroundColor: "{colors.neutral-muted}"
    textColor: "{colors.secondary}"
    rounded: "{rounded.sm}"
    padding: "8px 12px"
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.button-md}"
    rounded: "{rounded.md}"
    padding: "16px 24px"
  button-primary-hover:
    backgroundColor: "{colors.primary-strong}"
    textColor: "{colors.on-primary}"
  hero-panel:
    backgroundColor: "{colors.hero-overlay}"
    textColor: "{colors.on-inverse}"
    padding: "{spacing.hero-offset}"
  input-field:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.secondary-muted}"
    typography: "{typography.body-lg}"
    rounded: "{rounded.sm}"
    padding: "12px 16px"
    height: 52px
  sidebar-panel:
    backgroundColor: "{colors.surface-subtle}"
    textColor: "{colors.on-surface-muted}"
    padding: "{spacing.xl}"
  article-card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.md}"
    padding: "{spacing.xl}"
  notice-panel:
    backgroundColor: "{colors.surface-tinted}"
    textColor: "{colors.secondary-muted}"
    rounded: "{rounded.md}"
    padding: "{spacing.lg}"
  editorial-link:
    backgroundColor: "{colors.neutral}"
    textColor: "{colors.tertiary}"
    typography: "{typography.body-md}"
  rule-subtle:
    backgroundColor: "{colors.border}"
    height: 1px
  rule-strong:
    backgroundColor: "{colors.border-strong}"
    height: 1px
  footer-bar:
    backgroundColor: "{colors.footer}"
    textColor: "{colors.on-footer}"
    padding: "{spacing.xl}"
  footer-icon:
    backgroundColor: "{colors.inverse}"
    textColor: "{colors.on-inverse}"
    rounded: "{rounded.full}"
---

## Overview

This design system has a deliberate split personality.

The landing experience is cinematic and atmospheric: a full-bleed photographic hero, strongly darkened with an overlay, carries large white type and a compact teal call to action. The interior experience is the opposite: bright, quiet, and editorial. White surfaces, soft gray text, simple dividers, and broad negative space make the site feel like a personal notebook or essay archive rather than a dense application.

The emotional effect should be calm, self-possessed, and slightly contemplative. Nothing should feel flashy or ornamental. The site earns contrast in a few specific places only: the hero image, the dark footer, teal action buttons, and indigo editorial links.

## Colors

The palette is mostly neutral and depends on contrast, not saturation.

- **Primary (#0F766E):** Reserved for the main call to action and other rare, high-intent interactions.
- **Secondary (#374151):** The core ink color for headings, navigation, and high-confidence body text.
- **Tertiary (#4338CA):** Used sparingly for editorial links and informational callouts.
- **Neutrals (#FFFFFF, #F9FAFB, #F3F4F6):** The dominant surfaces. These keep the content pages airy and unobtrusive.
- **Footer / Inverse (#111827):** A dense charcoal used only where the design intentionally flips to a dark mode treatment.

The rendered UI confirms that the system is not built around colorful UI chrome. Accent color only appears when something needs emphasis. Most of the time the page should feel white, slate, and spacious.

## Typography

Typography is entirely system-sans and intentionally unbranded. That is part of the identity.

- **Display text:** Large, semibold, and tightly tracked. It creates authority through scale rather than through a bespoke typeface.
- **Headlines:** Slate-colored and weighty, but never decorative.
- **Body copy:** Comfortable, neutral, and slightly generous in line height.
- **Labels and navigation:** Small, medium-weight, and understated. They should feel crisp rather than loud.
- **Code snippets:** Monospace chips appear inline as quiet technical annotations inside otherwise editorial prose.

This system should never lean on expressive fonts, dramatic italics, or mixed typographic voices. Its personality comes from restraint and spacing.

## Layout

The layout is wide-gutter and desktop-airy even when the content itself is simple.

- Use a 4px-derived spacing scale, but favor 16px, 24px, 32px, and 48px intervals in real composition.
- Page gutters expand aggressively across breakpoints: roughly 32px on small screens, 64px on medium screens, and 128px on large screens.
- Standard content pages should feel left-aligned, readable, and open rather than centered into a narrow column by default.
- Multi-column layouts should preserve strong breathing room. The contact page demonstrates this with a pale informational sidebar and a larger white form column.
- The homepage hero is full viewport height and should be allowed to dominate the first screen.

Large empty regions are intentional. Do not “fill” them just because space is available.

## Elevation & Depth

Depth is used lightly on interior pages and heavily in the hero treatment.

- The hero achieves depth through photography plus dark overlay, not through card stacks.
- Navigation, inputs, and cards use soft Tailwind-style shadows that read as practical lift, not premium gloss.
- Most surfaces remain flat white or pale gray; shadow is used to separate form fields and card containers, not to dramatize the interface.
- The footer creates a hard tonal base at the bottom of the page instead of relying on elevation.

If adding new surfaces, prefer tonal contrast first and shadow second.

## Shapes

Corners are softly modern, not round for playfulness and not sharp for austerity.

- Inputs and active navigation treatments use a small radius.
- Primary buttons and content cards use a medium radius.
- Pills and tags can use a full radius, but they should remain rare accents rather than a dominant motif.

The overall geometry should stay rectangular and calm.

## Components

### Hero

The homepage hero is the signature component. It must combine:

- A large photographic background.
- A substantial dark overlay.
- White display text aligned left.
- A single teal action button that feels modest relative to the image and headline.

The button should not overpower the hero. The image and text are the primary event.

### Navigation

The navigation bar is quiet and editorial:

- White background.
- Slate wordmark.
- Small slate links with a soft active fill.
- Minimal shadow to lift it from the page.

It should feel like framing, not branding.

### Forms

Forms are utility surfaces, not marketing objects:

- White inputs with light gray borders and subtle shadow.
- Generous horizontal padding.
- Muted placeholder text.
- A single strong teal submit button.

Keep form fields simple and rectangular. Avoid decorative outlines, gradients, or oversized labels.

### Notices

Informational notices use a pale indigo tint and darker indigo links. They should read as helpful annotations rather than warnings.

### Footer

The footer is the strongest non-hero contrast block in the system:

- Solid charcoal background.
- White or near-white text and icons.
- Simple horizontal arrangement with no extra ornament.

It should feel grounded and conclusive.

## Do's and Don'ts

- Do preserve the tension between the moody hero and the quiet interior pages.
- Do keep accent colors scarce and intentional.
- Do favor whitespace over extra separators or decoration.
- Do let typography and photography carry the tone.
- Don't introduce bright multi-color UI accents outside purposeful link or CTA use.
- Don't swap in expressive brand fonts; the system-sans neutrality is part of the look.
- Don't make cards, forms, or navigation feel glossy, glassy, or overly elevated.
- Don't crowd layouts to “use up” available space.
