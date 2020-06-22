<script context="module">
  export async function preload (page, session) {
    const { permalink, year, month, date } = page.params

    const url = `/posts/${year}-${month}-${date}/${permalink}.json`

    const r = await this.fetch(url)
    const post = await r.json()

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
