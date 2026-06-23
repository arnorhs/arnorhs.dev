# Developer/Agent Guide: arnorhs.dev

This repository contains the personal website and blog of Arnór Heiðar Sigurðsson (`arnorhs.dev`), structured as a monorepo managed with **Turborepo** and **pnpm**.

---

## 1. Project Directory Structure

The project has two main sections containing source files:

- **`content/posts/`**: Contains the raw Markdown files representing the blog posts.
- **`pkg/`**: Contains the application packages.

```
arnorhs.dev/
├── content/
│   └── posts/               # Raw markdown blog posts grouped by year
│       ├── YYYY/
│       │   └── post-slug.md
├── pkg/
│   ├── astro/               # Astro static site frontend
│   ├── posts/               # Post-processing package (Markdown to JSON)
│   └── post-images-worker/  # Cloudflare Worker for serving images
├── package.json
└── pnpm-workspace.yaml
```

---

## 2. Where Content Lives

Raw blog posts are written in standard Markdown and reside under the root `content/posts/` directory.

- **Storage Format:** Files are organized into subdirectories by year of publication (e.g., `content/posts/2010/`, `content/posts/2011/`).
- **Filename convention:** The filename is the slug of the post with a `.md` extension, **without** the date prefix (e.g. `my-favorite-tech.md`).
- **Frontmatter Schema:**
  ```yaml
  ---
  title: 'Post Title'
  summary: 'Brief synopsis. Will be used for SEO meta tags and preview snippets.'
  date: YYYY-MM-DD
  ---
  ```

---

## 3. URL and Link Structure (CRITICAL)

To prevent unnecessary redirects and maintain clean SEO, follow these strict routing conventions:

### Trailing Slashes

All internal links **MUST** end with a trailing slash. The hosting server and Astro router will trigger 307 redirects for URLs lacking trailing slashes.

- **Good:** `href="/about/"`, `href="/archive/"`, `href="/disclaimer/"`
- **Bad:** `href="/about"`, `href="/archive"`, `href="/disclaimer"`

### Post URL Structure

A post file stored at `content/posts/YYYY/slug.md` is served at the following URL path:

```
/posts/YYYY-MM-DD/slug/
```

_Note the date prefix (fetched from the frontmatter date) and the trailing slash._

The `@arnorhs/posts` package parses the markdown files and dynamically appends the trailing slash via the `url` property on the post objects (in [getAllPosts.ts](file:///Users/arnorhs/projects/arnorhs.dev/pkg/posts/src/lib/getAllPosts.ts)). Always use `post.url` in layouts and components.

---

## 4. Metadata and SEO Rules

SEO metadata is managed globally in [MainLayout.astro](file:///Users/arnorhs/projects/arnorhs.dev/pkg/astro/src/layouts/MainLayout.astro):

- **Titles:** Main page titles are suffixed with ` - arnorhs.dev` (e.g. `About - arnorhs.dev`).
- **Descriptions:** Meta descriptions (`description`, `og:description`, `twitter:description`) must range **between 110 and 160 characters**.
  - The layout uses a helper function `formatMetaDescription()` to automatically clean up leading/trailing white space, strip HTML tags from post summaries, and truncate the text cleanly at a word boundary before 160 characters (appending `...` if truncated).

---

## 5. Technology Stack & Key Commands

- **Frontend:** Built with **Astro** (in `pkg/astro`).
- **Post Parsing:** Built with **Vite** and **marked** (in `pkg/posts`).
- **Styles:** Styled using **Tailwind CSS**.

### Key Commands (from workspace root)

- **Install Dependencies:**
  ```bash
  pnpm install
  ```
- **Local Dev Server:**
  ```bash
  pnpm dev
  ```
- **Type Checking:**
  ```bash
  pnpm turbo typecheck
  ```
- **Test suite:**
  ```bash
  pnpm turbo test
  ```
- **Link checking for markdown posts:**
  ```bash
  pnpm check:links
  ```

  - Script location: `scripts/check-links.mjs`
  - Common flags:
    ```bash
    pnpm check:links -- --external-only
    pnpm check:links -- --dir content/posts/2012 --concurrency 5 --timeout-ms 8000
    pnpm check:links -- --fail-on-warn
    ```
