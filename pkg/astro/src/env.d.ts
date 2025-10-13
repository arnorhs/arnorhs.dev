/// <reference types="astro/client" />

// use a default runtime configuration (advanced mode).
type Runtime = import('@astrojs/cloudflare').Runtime<Cloudflare.Env>

declare namespace App {
  interface Locals extends Runtime {
    runtime: {
      env: Cloudflare.Env
    }
  }
}
