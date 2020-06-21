<script context="module">
  // import the logic for finding a post based on permalink
  import { findPost } from "../../../posts"

  // sapper calls this to load our data
  export const preload = page => {
    // find the post based on the permalink param
    const { permalink } = page.params

    const post = findPost(permalink)

    // return a list of props
    return { post }
  }
</script>

<script>
  // this prop is filled from the result of the `preload()`
  export let post;
</script>

<article class='container'>
  <!-- display the post -->
  <h1>{post.title}</h1>

  {@html post.html}
</article>
