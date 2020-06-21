<script>
  // import the list of posts
  import { posts } from "../posts";
</script>

<div class='container'>
  <h1>My blugg</h1>

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