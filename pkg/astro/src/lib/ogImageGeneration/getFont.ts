import { loadGoogleFont } from 'workers-og'

export type Font = {
  name: string
  weight: number
  data: ArrayBuffer
}
export async function getFont(localName: string, googleName: string, weight: number) {
  return {
    name: localName,
    weight,
    data: await loadGoogleFont({
      family: googleName,
      weight,
    }),
  }
}
