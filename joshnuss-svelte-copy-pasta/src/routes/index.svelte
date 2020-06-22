<script context="module">
  import PostArticle from '../components/post-entry.svelte'
  import { propMap, toDate } from '../utils'

  export async function preload (page, session) {
    const r = await this.fetch('/posts.json')
    const posts = await r.json()

    return { posts: posts.map(propMap('date', toDate)).slice(0, 12) }
  }
</script>

<script>
  export let posts
</script>

<svelte:head>
  <title>arnorhs.dev - home</title>
  <meta
    name="description"
    content="
      Web development, web design, mobile app design, mobile app development in
      Android and iOS.
    "
  />
</svelte:head>

<main class='container'>
  {#each posts as post}
    <PostArticle post={post} />
  {/each}

  <div class="text-right">
    <a href='/archive'>More &gt;&gt;</a>
  </div>
</main>