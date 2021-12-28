export function debounce<T extends Function>(fn: T, delay: number) {
  let timer: NodeJS.Timeout
  return (...args: any[]) => {
    clearTimeout(timer)
    timer = setTimeout(fn.bind(undefined, args), delay)
  }
}

export function ifWindow<T>(fn: () => T, fb: () => T): T {
  if (typeof window !== 'undefined') {
    return fn()
  }

  return fb()
}

export const getScrollTop = () =>
  ifWindow(
    () => window.document.children[0].scrollTop,
    () => 0,
  )

export * from './mulberry32'
