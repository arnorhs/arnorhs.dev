import { onMount, onCleanup } from 'solid-js'

type EvKey = keyof DocumentEventMap

type EventHandler<K extends EvKey> = (this: Document, ev: DocumentEventMap[K]) => unknown

export function bindDocumentEventListener<K extends EvKey>(eventName: K, fn: EventHandler<K>) {
  onMount(() => {
    window.document.addEventListener(eventName, fn)
  })

  onCleanup(() => {
    window.document.removeEventListener(eventName, fn)
  })
}
