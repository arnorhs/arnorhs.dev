export const propMap = (key, mapper) => (o) => ({
  ...o,
  [key]: mapper(o[key]),
})

export const toDate = (str) => new Date(str)

export const dateFormat = (date) => {
  const options = {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }

  return date.toLocaleDateString(undefined, options)
}

export const logMap = (item) => {
  console.log(item)

  return item
}

/**
 * creates a reducer to group arrays by accessor function
 * @param keyFn function to return the group this item belongs to
 * @returns reducer for Array.prototype.reduce()
 */
export function groupBy<T>(keyFn: (T) => string) {
  return (acc = {} as Record<string, T[]>, item: T) => {
    const key = keyFn(item)
    if (!acc[key]) {
      acc[key] = []
    }
    acc[key].push(item)
    return acc
  }
}

export function debounce<T extends Function>(fn: T, delay: number) {
  let timer = null
  return (...args) => {
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

// from https://stackoverflow.com/questions/521295/seeding-the-random-number-generator-in-javascript
export function mulberry32(seed = 0) {
  return function (): number {
    const x = Date.now()
    let t = (seed += 0x6d2b79f5)
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}
