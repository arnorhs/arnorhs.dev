<script context="module">
  import { propMap, toDate } from '../utils'

  export async function preload (page, session) {
    const r = await this.fetch('/posts.json')
    const posts = await r.json()

    return { posts: posts.map(propMap('date', toDate)) }
  }
</script>

<script>
  export let posts
</script>

<div class='container'>
  <!-- iterate through each post -->
  {#each posts as post}
    <article>
      <!-- link article to /posts/$permalink -->
      <a href={post.url}>
        <h2>{post.title}</h2>
      </a>

      <span aria-label='published date'>{post.date}</span>
      <p>{post.summary}</p>

      <div>
        <a href={post.url}>Read on</a>
      </div>
    </article>
  {/each}
</div>