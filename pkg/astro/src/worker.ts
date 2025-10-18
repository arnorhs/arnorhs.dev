import type { SSRManifest } from 'astro'
import { App } from 'astro/app'
import { handle } from '@astrojs/cloudflare/handler'
import { DurableObject } from 'cloudflare:workers'
import { getFont, type Font } from './lib/ogImageGeneration/getFont'

export class OgImageGeneratorStore extends DurableObject<Env> {
  font: { normal: Font; bold: Font } | null = null

  async getFont() {
    if (!this.font) {
      console.log('no font, fetching font...')

      // Note: I was unable to make it target the right font weight
      // when this had the same name...
      this.font = {
        normal: await getFont('figtree-regular', 'Figtree', 400),
        bold: await getFont('figtree-bold', 'Figtree', 700),
      }
    }

    return [this.font.normal, this.font.bold]
  }
}

export function createExports(manifest: SSRManifest) {
  const app = new App(manifest)

  return {
    default: {
      async fetch(request: any, env: any, ctx) {
        return handle(manifest, app, request, env, ctx)
      },
    } satisfies ExportedHandler<Env>,
    OgImageGeneratorStore,
  }
}
