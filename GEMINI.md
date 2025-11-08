# arnorhs.dev - Project Overview

This repository contains the source code for Arnor's personal website and blog, `arnorhs.dev`. It is structured as a monorepo using [Turborepo](https://turbo.build/) to manage multiple interdependent packages. The blog itself is built with [Astro](https://astro.build/).

## Project Structure

The project is organized into a monorepo with the following key packages located in the `pkg/` directory:

- **`@arnorhs/astro` (pkg/astro):**
  - This is the main Astro-based website and blog. It consumes the processed blog post content from `@arnorhs/posts`.
  - It uses Tailwind CSS for styling and includes integrations for RSS feeds and sitemaps.
  - **Key Technologies:** Astro, Tailwind CSS, PostCSS, Autoprefixer, `@astrojs/rss`, `@astrojs/sitemap`.

- **`@arnorhs/posts` (pkg/posts):**
  - This package is responsible for managing and processing the blog post content, which is primarily written in Markdown.
  - It provides the data for the Astro site.
  - **Key Technologies:** Vite, Vitest, TypeScript, `marked`, `yaml-front-matter`.

- **`@arnorhs/post-images-worker` (pkg/post-images-worker):**
  - This package contains a Cloudflare Worker responsible for processing and serving post-related images.
  - **Key Technologies:** Cloudflare Workers, TypeScript, Wrangler.

## Getting Started

To set up and run the project locally, follow these steps:

1.  **Install Dependencies:**
    The project uses `pnpm` as its package manager. Ensure you have `pnpm` installed.

    ```bash
    pnpm install
    ```

2.  **Development Mode:**
    To start the development server for the Astro site, which includes watching for changes in the `@arnorhs/astro` package:

    ```bash
    pnpm dev
    ```

    This command uses Turborepo to run the `dev` script specifically for the `@arnorhs/astro` workspace.

3.  **Type Checking:**
    To run type checks across all packages:

    ```bash
    pnpm turbo typecheck
    ```

4.  **Running tests:**
    To create a static production build of the website:
    ```bash
    pnpm turbo test
    ```

## License

The source code for this project is released under the MIT License. However, all rights are reserved for the content of the blog posts, located in the `posts` directory.
