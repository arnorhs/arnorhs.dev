<script context="module">
  import { toDate } from '../../../utils'

  export async function preload (page, session) {
    const { permalink, year, month, date } = page.params

    const url = `/posts/${year}-${month}-${date}/${permalink}.json`

    const r = await this.fetch(url)
    const post = await r.json()

    return {
      post: {
        ...post,
        date: toDate(post.date)
      }
    }
  }
</script>

<script>
  import { dateFormat } from '../../../utils'

  export let post;
</script>

<main>
  <article class='container'>
    <!-- display the post -->
    <h1>{post.title}</h1>
    <p class='mt-0 text-xs' aria-label='published date'>{dateFormat(post.date)}</p>

    {@html post.html}
  </article>
</main>