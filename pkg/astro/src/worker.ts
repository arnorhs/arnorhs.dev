// import { handle } from '@astrojs/cloudflare/handler'
// import type { SSRManifest } from 'astro'
// import { App } from 'astro/app'
// import { DurableObject } from 'cloudflare:workers'
// import { getFontCollection, type Font } from './lib/ogImageGeneration/getFontCollection'

// export class OgImageGeneratorStore extends DurableObject<Env> {
//   fonts: Font[] | null = null

//   async getFont() {
//     if (!this.fonts) {
//       this.fonts = await getFontCollection()
//     }

//     return this.fonts
//   }
// }

// export function createExports(manifest: SSRManifest) {
//   const app = new App(manifest)

//   return {
//     default: {
//       async fetch(request: any, env: any, ctx) {
//         return handle(manifest, app, request, env, ctx)
//       },
//     } satisfies ExportedHandler<Env>,
//     OgImageGeneratorStore,
//   }
// }
