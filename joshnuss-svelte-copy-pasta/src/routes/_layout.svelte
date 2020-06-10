<script>
  import Nav from '../components/nav.svelte'
  // export let segment
</script>

<style global>
  @tailwind base;

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
    @apply text-3xl;
  }

  h2 {
    @apply text-2xl;
  }

  h3 {
    @apply text-xl;
  }

  h4 {
    @apply text-lg;
  }

  h5 {
    @apply text-base;
  }

  h1 {
    @apply text-sm;
  }

  @tailwind components;
  @tailwind utilities;
</style>

<main>
  <Nav />
  <slot />
</main>
