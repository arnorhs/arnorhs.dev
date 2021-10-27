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
