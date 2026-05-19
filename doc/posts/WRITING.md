# Writing Posts

This guide captures the authoring patterns currently demonstrated by the sample posts in `src/posts/`. It is intended to preserve the useful writer knowledge before those template posts are replaced.

## What A Post Is In This Repo

- Posts live in `src/posts/*.md`.
- `src/posts/posts.json` applies shared defaults to every post:
  - `layout: post`
  - `tags: ["post"]`
  - permalink pattern `/YYYY/MM/DD/slug/`
  - default author slug from `meta.authorURL`
- Eleventy is configured with `markdownTemplateEngine: "njk"`, so Markdown posts can also use Nunjucks shortcodes.

## Common Writing Pattern In The Sample Posts

The sample posts follow a consistent instructional structure:

1. Start with concise frontmatter.
2. Open with a short explanation of the feature or technique.
3. Show a literal example, usually as code or frontmatter.
4. Show the rendered result or explain what the reader should expect.
5. Add caveats, editor tips, and references to the relevant config files.

This works well for technical or implementation-heavy posts. For your own essays or blog writing, you can keep the same frontmatter discipline without copying the tutorial tone.

## Recommended Frontmatter

The sample posts consistently use these fields:

```yaml
---
title: My Post Title
date: 2026-05-19T09:00:00.000Z
author: yuri-vyatkin
excerpt: One short summary sentence for listings and metadata.
draft: false
seo:
  title:
  description:
  image:
images:
  thumb: 2026/05/my-thumb.jpg
  feature: 2026/05/my-feature.jpg
  align: object-center
  height: h-48 md:h-1/3
tags:
  - essay
  - engineering
---
```

### Frontmatter Notes

- `title`, `date`, and `excerpt` should be treated as standard fields.
- `author` should match a slug in `src/_data/authors.json`.
- If you omit `author`, `src/posts/posts.json` falls back to `meta.authorURL` from `src/_data/meta.js`.
- `draft: true` keeps a post visible in local development but excludes it from production builds.
- `tags` drive tag pages and cross-linking. The shared `post` tag is already added by `src/posts/posts.json`.
- `seo` overrides default metadata from `src/_data/meta.js`.
- `images.thumb` is the main listing thumbnail.
- `images.feature` adds a featured image at the top of the post.
- `images.align` controls featured-image object positioning.
- `images.height` overrides the default featured-image height classes.

## Metadata And Fallback Behavior

The head template in `src/_includes/partials/head.njk` resolves metadata in this order:

- SEO title: `seo.title`, then `title`
- SEO description: `seo.description`, then `excerpt`, then site description
- Social image: `seo.image`, then global site image

Practical advice:

- Always write an `excerpt`; it improves blog listings and covers metadata fallback.
- Add `seo.image` when the social-sharing image should differ from the post thumbnail.
- Keep `excerpt` short enough to read cleanly in cards and previews.

## Images

The post examples assume image paths are relative to `src/assets/images/`.

Example:

```yaml
images:
  thumb: 2026/05/my-thumb.jpg
  feature: 2026/05/my-feature.jpg
  align: object-left
  height: h-64 md:h-1/3
```

Guidelines:

- Put new post images under a dated or topic-specific folder in `src/assets/images/`.
- Prefer landscape images for thumbnails and featured images.
- Use `images.feature` only when the post benefits from a large visual header.
- Use `seo.image` if social cards need a different crop or composition.

## Markdown Features Available To Writers

Markdown is configured with:

- raw HTML enabled
- automatic line breaks
- linkification
- typographic replacements
- emoji codes via `markdown-it-emoji`
- syntax highlighting via Eleventy’s syntax highlight plugin

What that means in practice:

- You can write normal Markdown freely.
- You can embed small amounts of HTML when Markdown alone is not enough.
- Emoji codes like `:bulb:` and `:fire:` render correctly.
- Fenced code blocks are supported and highlighted.

## Nunjucks Shortcodes Available In Posts

Because Markdown is processed through Nunjucks, posts can use shortcodes directly.

### `youtube`

Defined in `utils/shortcodes.js`.

```njk
{% youtube "oHg5SJYRHA0", "Video Title", "16:9", "1:30" %}
```

- Required: YouTube ID
- Optional: title
- Optional: aspect ratio
- Optional: start time in `m:ss`

### `wrap`

Defined in `utils/paired-shortcodes.js`.

```njk
{% wrap "my-6 rounded-lg border bg-gray-100" %}
Wrapped content here.
{% endwrap %}
```

Use this when Markdown needs a styled container.

### `bq`

```njk
{% bq "p-4 italic border-l-4 border-red-500 bg-gray-100" %}
Custom blockquote content.
{% endbq %}
```

Use this when native Markdown blockquotes are too limited.

### `columns` and `cols`

```njk
{% columns %}
{% cols "bg-gray-100 rounded-lg" %}
Left column
{% endcols %}
{% cols "bg-gray-100 rounded-lg" %}
Right column
{% endcols %}
{% endcolumns %}
```

Use these for side-by-side content on larger screens.

### `dl`, `dt`, and `dd`

```njk
{% dl %}
{% dt %}Question{% enddt %}
{% dd %}Answer{% enddd %}
{% enddl %}
```

Use these for FAQs, glossaries, or other description-list content.

### `svg`

The sample posts use the SVG sprite shortcode provided by the Eleventy SVG sprite plugin.

```njk
{% svg "github", "h-8 w-8 text-blue-500", "GitHub icon", "decorative" %}
```

Use this for inline icons sourced from `src/assets/svg/`.

## Hero Support

Posts can opt into the same hero system used elsewhere in the site. The sample content shows `graphic`, `carousel`, `video`, and `split` variants.

Use hero frontmatter only when a post genuinely needs a large top-of-page treatment. For most normal articles, `images.feature` is the simpler and safer choice.

Important cautions:

- Hero frontmatter is indentation-sensitive.
- Hero text is treated as plain text, not trusted HTML.
- Always test hero layouts on mobile as well as desktop.

If you need hero work, start by studying `doc/posts/examples/2020-09-11-manage-hero.md` and `src/index.md`.

## Author, Tags, Navigation, And Sharing

The `post` layout in `src/_includes/layouts/post.njk` automatically provides:

- publish date
- author link, if enabled globally and the post has an author
- post body rendering
- tag pills, if enabled globally
- social share links, if enabled globally
- previous and next post links

Implications for writers:

- Adding tags improves internal navigation immediately.
- Adding a valid author slug enables author attribution and author archive links.
- Social share links use the post title, page URL, and metadata automatically.

## Draft Workflow

Draft behavior is implemented in `.eleventy.js`.

- In development, all posts are included.
- In production, posts with `draft: true` are filtered out.

Use `draft: true` for work in progress. Remove it or set `draft: false` when publishing.

## Writing Tips From The Existing Posts

- Keep the frontmatter tidy and consistently indented. YAML mistakes break builds quickly.
- Treat `excerpt` as required even when technically optional.
- Prefer relative asset paths that match the conventions already used in `src/assets/images/`.
- Use shortcodes sparingly and intentionally. They are useful, but they also couple content to template behavior.
- When a post needs unusual layout treatment, prefer supported shortcodes over raw ad hoc HTML.
- For normal prose, keep the content simple and let the layout do the work.
- If a post needs custom metadata for social sharing, add it explicitly rather than relying on fallbacks.

## Suggested Minimal Template For New Posts

```yaml
---
title: Post Title
date: 2026-05-19T09:00:00.000Z
author: yuri-vyatkin
excerpt: One-sentence summary for listings and metadata.
draft: true
seo:
  title:
  description:
  image:
images:
  thumb: 2026/05/post-thumb.jpg
tags:
  - notes
---
```

Then write ordinary Markdown first. Add only the extra facilities you actually need:

- `images.feature` for a featured image
- `seo.*` for metadata overrides
- shortcodes for richer layout
- `hero` only for intentionally designed landing-style posts

## Archived Post Examples

The archived sample posts in `doc/posts/examples/` are useful as capability references. They are strongest as implementation examples, not as models of voice or editorial style.

- `doc/posts/examples/2020-09-01-manage-color-settings.md`: explains how color decisions are split between data files and Tailwind classes; useful when a writer needs to understand which visual choices are content-controlled versus theme-controlled.
- `doc/posts/examples/2020-09-02-manage-social-and-footer-icons.md`: shows how social icons, author icons, and share icons are controlled; useful when a post will rely on author metadata, social display, or inline SVG icon usage.
- `doc/posts/examples/2020-09-03-columns.md`: demonstrates `wrap`, `columns`, and `cols`; useful when prose needs a side-by-side or boxed layout inside Markdown.
- `doc/posts/examples/2020-09-04-description-lists.md`: demonstrates `dl`, `dt`, and `dd`; useful for FAQs, glossary-style writing, and structured question/answer sections.
- `doc/posts/examples/2020-09-05-blockquotes.md`: compares native Markdown blockquotes with the `bq` shortcode; useful when emphasis callouts need more visual control.
- `doc/posts/examples/2020-09-06-featured-images.md`: shows how `images.feature`, `images.thumb`, alignment, and height work; useful when choosing between a plain post, a thumbnail, and a large visual header.
- `doc/posts/examples/2020-09-07-full-frontmatter-example.md`: the broadest frontmatter inventory; useful as a checklist when a page or post needs more than the minimal template.
- `doc/posts/examples/2020-09-08-youtube-embed.md`: demonstrates the `youtube` shortcode; useful for video embeds, aspect-ratio overrides, and custom start times.
- `doc/posts/examples/2020-09-09-svg-shortcode.md`: explains the SVG sprite workflow and inline SVG shortcode; useful when a post needs icons or decorative inline graphics.
- `doc/posts/examples/2020-09-10-meta-og-twitter.md`: explains metadata fallback and override behavior; useful when social cards, search snippets, or Open Graph output need deliberate control.
- `doc/posts/examples/2020-09-11-manage-hero.md`: the main hero reference; useful when a post needs a graphic, carousel, split, or video hero and you need to understand the frontmatter contract.
- `doc/posts/examples/2020-09-12-tailwind.md`: explains where prose styling actually comes from; useful when a writer expects Markdown elements to look different and needs to know whether the change belongs in content or CSS.
- `doc/posts/examples/2020-09-20-draft-posts.md`: explains the draft workflow conceptually; useful for understanding why unpublished work still appears locally but not in production.

## Files Worth Checking When Authoring

- `src/posts/posts.json`: shared post defaults
- `src/_data/authors.json`: valid author slugs
- `src/_data/meta.js`: site-level metadata fallbacks
- `utils/shortcodes.js`: single shortcodes
- `utils/paired-shortcodes.js`: paired shortcodes
- `src/_includes/layouts/post.njk`: post page chrome
- `src/_includes/partials/head.njk`: metadata logic
- `doc/posts/examples/2020-09-11-manage-hero.md`: hero reference

## Bottom Line

The sample posts are less a model of voice than a model of capability discovery. Preserve the disciplined frontmatter, the use of excerpts and tags, and the supported shortcode and media patterns. Replace the tutorial prose freely.
