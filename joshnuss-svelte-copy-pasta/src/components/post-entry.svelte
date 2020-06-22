<script>
import { dateFormat } from '../utils'

export let post
</script>

<article>
  <!-- link article to /posts/$permalink -->
  <h2 class='mb-0'>
    <a href={post.url}>{post.title || 'missing title'}</a>
  </h2>

  <p class='mt-0 text-xs' aria-label='published date'>{dateFormat(post.date)}</p>

  <p>{@html post.summary}</p>

  <p>
    <a href={post.url}>Read on</a>
  </p>
</article>
