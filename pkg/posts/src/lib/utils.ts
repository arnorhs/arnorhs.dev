/**
 * creates a reducer to group arrays by accessor function
 * @param keyFn function to return the group this item belongs to
 * @returns reducer for Array.prototype.reduce()
 */
export function groupBy<T>(keyFn: (val: T) => string | number) {
  return (acc = {} as Record<string, T[]>, item: T) => {
    const key = keyFn(item)
    if (!acc[key]) {
      acc[key] = []
    }
    acc[key].push(item)
    return acc
  }
}
