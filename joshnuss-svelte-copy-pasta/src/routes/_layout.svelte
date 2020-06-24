<script>
  import Nav from '../components/nav.svelte'
  import GoogleAnalytics from 'sapper-google-analytics/GoogleAnalytics.svelte'
  import { stores } from '@sapper/app'

  let analId = "GTM-MJFKX56"
</script>

<style global>
  @tailwind base;

  html {
    font-size: 16px;
  }

  /* todo: is there a way to get the svelte breakpoint here */
  @media screen and (min-width: 640px) {
    html {
      font-size: 24px;
    }
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
    @apply mt-4;
    @apply mb-2;
  }

  @tailwind components;
  @tailwind utilities;
</style>

<svelte:head>
  <title>arnorhs.dev</title>
</svelte:head>

<div class='sm:px-2 md:px-0'>
  <Nav />
  <slot />

  <footer>
    <div class="container text-center mt-4 py-4 border-t border-solid border-gray-200">
      &copy; Copyright 2020 Arnor Heidar Sigurdsson
    </div>
  </footer>
</div>

<GoogleAnalytics {stores} id={analId} />