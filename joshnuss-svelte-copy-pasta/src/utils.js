export const propMap = (key, mapper) => o => ({
  ...o,
  [key]: mapper(o[key])
})

export const toDate = str => dateFormat(new Date(str))

export const dateFormat = date => {
  const options = {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }

  return date.toLocaleDateString(undefined, options)
}
