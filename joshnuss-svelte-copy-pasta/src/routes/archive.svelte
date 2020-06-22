<script context="module">
  import { propMap, toDate } from '../utils'

  export async function preload (page, session) {
    const r = await this.fetch('/posts.json')
    const posts = await r.json()

    return { posts: posts.map(propMap('date', toDate)) }
  }
</script>

<script>
  import PostArticle from '../components/post-entry.svelte'

  export let posts
</script>

<div class='container'>
  <h1>Post archive</h1>

  <p>
    This is the archive of all my blog posts. The archive includes blog posts imported from my old
    WordPress based blog which was hosted on arnorhs.com before I forgot to renew it and it went
    on to a new respectable owner. Those posts might be a bit broken or have missing references.
  </p>

  {#each posts as post}
    <PostArticle post={post} />
  {/each}
</div>