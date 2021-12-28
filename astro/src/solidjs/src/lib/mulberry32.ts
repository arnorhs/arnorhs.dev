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
