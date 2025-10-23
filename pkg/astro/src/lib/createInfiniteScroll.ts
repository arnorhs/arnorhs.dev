class PostLoader {
  private promises = new Map<string, Promise<void>>()

  constructor(
    private readonly onHtml: (data: { postHtml: string; paginationHtml: string }) => void,
  ) {}

  loadPosts(href: string) {
    if (this.promises.has(href)) {
      return
    }

    this.promises.set(href, this._loadPosts(href))
  }

  private async _loadPosts(href: string) {
    const res = await fetch(href)

    if (!res.ok) {
      console.warn('res not ok', res.status, res.statusText, await res.text())
      return
    }

    const html = await res.text()

    const parser = new DOMParser()
    const doc = parser.parseFromString(html, 'text/html')
    const postHtml = doc.querySelector('#postcontainer')?.innerHTML
    if (!postHtml) {
      console.warn('no innerHtml found from postcontainer query thing')
      return
    }

    const paginationHtml = doc.querySelector('#paginationcontainer')?.innerHTML

    if (!paginationHtml) {
      console.warn('no pagination html found')
      return
    }

    this.onHtml({ postHtml, paginationHtml })
  }
}

export function createInfiniteScroll() {
  const postContainer = document.getElementById('postcontainer')
  if (!postContainer) {
    console.error('postContainer not found')
    return
  }

  const paginationContainer = document.getElementById('paginationcontainer')
  if (!paginationContainer) {
    console.error('paginationContainer not found')
    return
  }

  const onUrl = (url: string) => {
    postLoader.loadPosts(url)
  }

  const postLoader = new PostLoader(({ postHtml, paginationHtml }) => {
    console.log('post loader sent us html, rebinding event handler')
    postContainer.insertAdjacentHTML('beforeend', postHtml)
    paginationContainer.innerHTML = paginationHtml
    setTimeout(() => {
      bindInfiniteScroll(onUrl)
    }, 100)
  })

  setTimeout(() => {
    bindInfiniteScroll(onUrl)
  }, 100)
}

function bindInfiniteScroll(onTrigger: (url: string) => void) {
  const nextPageTargets = document.querySelectorAll('a[data-next-page-link]')
  const nextPageLink =
    nextPageTargets.length > 0
      ? (nextPageTargets[nextPageTargets.length - 1] as HTMLAnchorElement)
      : null

  if (!nextPageLink) {
    // we are probably at the end of the page
    console.info('nextPageLink not found')
    return
  }

  console.info('creating new observer for', nextPageLink.href)

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (
        !entry.isIntersecting ||
        // @ts-expect-error - I have no idea
        !entry.isVisible ||
        entry.target !== nextPageLink
      ) {
        return
      }

      console.log('intersection with', nextPageLink.href)
      observer.unobserve(nextPageLink)
      onTrigger(nextPageLink.href)
    },
    {
      rootMargin: '300px',
      // @ts-expect-error - i have no idea
      trackVisibility: true,
      threshold: 1.0,
      delay: 100,
    },
  )

  observer.observe(nextPageLink)
}
