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

- **`@arnorhs/resoc` (pkg/resoc):**
  - This package is used for generating social media preview images (OG images) for the blog posts.
  - It leverages `@resoc/create-img` and likely uses data from `@arnorhs/posts` to create dynamic images.
  - **Key Technologies:** `@resoc/create-img`, TypeScript, Bun.

## Getting Started

To set up and run the project locally, follow these steps:

1.  **Install Dependencies:**
    The project uses `yarn` as its package manager. Ensure you have `yarn` installed.

    ```bash
    yarn install
    ```

2.  **Development Mode:**
    To start the development server for the Astro site, which includes watching for changes in the `@arnorhs/astro` package:

    ```bash
    yarn dev
    ```

    This command uses Turborepo to run the `dev` script specifically for the `@arnorhs/astro` workspace.

3.  **Type Checking:**
    To run type checks across all packages:

    ```bash
    yarn typecheck
    ```

4.  **Building for Production:**
    To create a static production build of the website:
    ```bash
    yarn export
    ```
    This command uses Turborepo to run the `export` script for the `@arnorhs/website` (which is likely an alias or a build target that includes `@arnorhs/astro`).

## License

The source code for this project is released under the MIT License. However, all rights are reserved for the content of the blog posts, located in the `posts` directory.
