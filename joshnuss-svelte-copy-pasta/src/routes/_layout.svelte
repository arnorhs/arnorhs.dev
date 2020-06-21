<script>
  import Nav from '../components/nav.svelte'
  // export let segment
</script>

<style global>
  @tailwind base;

  html {
    font-size: 24px;
  }

  a {
    @apply text-indigo;
  }

  a:hover {
    @apply text-indigo-dark;
  }

  article ul {
    @apply list-disc;
    @apply list-inside;
  }

  h1 {
    @apply text-5xl;
  }

  h2 {
    @apply text-3xl;
  }

  h3 {
    @apply text-2xl;
  }

  h4 {
    @apply text-xl;
  }

  h5 {
    @apply text-lg;
  }

  h6 {
    @apply text-base;
  }

  article h1,
  article h2,
  article h3,
  article h4,
  article h5,
  article ul,
  article ol,
  article p,
  article figure,
  article h6 {
    @apply mt-2;
    @apply mb-4;
  }

  @tailwind components;
  @tailwind utilities;
</style>

<main>
  <Nav />
  <slot />
</main>
