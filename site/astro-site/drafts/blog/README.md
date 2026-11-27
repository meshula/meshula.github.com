# Blog drafts

Unpublished blog source lives here so it is tracked by git without being loaded by
Astro's `blog` content collection.

Astro loads only `../src/content/blog/**/*.{md,mdx}`. Files in this directory are
invisible to the build until they are promoted.

## Promote a draft

1. Add the required frontmatter (`title`, `description`, `pubDate`).
2. Move the file into `../src/content/blog/`.
3. Run `npm run build` and check the generated page.

Current drafts:

- `airace.md`
- `ReadingMinsky.md`
- `svelte-tutorial.md`
- `tamagotchi.md`
