<script context="module">
  import { propMap, toDate } from '../utils'

  export async function preload (page, session) {
    const r = await this.fetch('/posts.json')
    const posts = await r.json()

    return { posts: posts.map(propMap('date', toDate)).slice(0, 12) }
  }
</script>

<script>
  import PostArticle from '../components/post-entry.svelte'

  export let posts
</script>

<main class='container'>
  {#each posts as post}
    <PostArticle post={post} />
  {/each}

  <div class="text-right">
    <a href='/archive'>More &gt;&gt;</a>
  </div>
</main>