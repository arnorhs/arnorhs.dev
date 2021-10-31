import { onMount, onCleanup } from 'solid-js'

export function bindDocumentEventListener(eventName: keyof DocumentEventMap, fn) {
  onMount(() => {
    window.document.addEventListener(eventName, fn)
  })

  onCleanup(() => {
    window.document.removeEventListener(eventName, fn)
  })
}
