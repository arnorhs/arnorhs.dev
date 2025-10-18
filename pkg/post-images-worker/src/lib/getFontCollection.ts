import { loadGoogleFont } from 'workers-og'

export type Font = {
  name: string
  weight: number
  data: ArrayBuffer
}

async function getFont(localName: string, googleName: string, weight: number): Promise<Font> {
  return {
    name: localName,
    weight,
    data: await loadGoogleFont({
      family: googleName,
      weight,
    }),
  }
}

export async function getFontCollection() {
  // Note: I was unable to make it target the right font weight
  // when this had the same name... so i'm just going with two names for now
  return [
    await getFont('figtree-semi', 'Figtree', 500),
    await getFont('figtree-bold', 'Figtree', 800),
  ]
}
