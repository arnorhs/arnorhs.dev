<script>
  // import the list of posts
  import { posts } from "../posts";
</script>

<h1>My blugg</h1>

<!-- iterate through each post -->
{#each posts as post}
  <article>
    <!-- link article to /posts/$permalink -->
    <a href={`/posts/${post.permalink}`}>
      <h2>{post.title}</h2>
      <p>{post.summary}</p>
    </a>
  </article>
{/each}
