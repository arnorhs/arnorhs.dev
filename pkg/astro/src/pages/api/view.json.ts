import { env } from 'cloudflare:workers'
import type { APIContext } from 'astro'
import {
  trackingRequestBody,
  createWriteDataPointBody,
} from '../../lib/analytics/trackingRequestBody'

// const ENABLE_LOGGING = !import.meta.env.DEV
const ENABLE_LOGGING = true

export const prerender = false

export async function POST({ request }: APIContext) {
  try {
    const body = trackingRequestBody.parse(await request.json())
    const country = request.headers.get('cf-ipcountry') || 'unknown'

    const dp = createWriteDataPointBody(body, country)
    if (ENABLE_LOGGING) {
      env.ARNORHS_ANALYTICS.writeDataPoint(dp)
    } else {
      console.info('Not logging datapoint', dp)
    }
  } catch (e) {
    console.error('Tracking Error:', e)
    return Response.json({ error: 'Error processing request' }, { status: 400 })
  }

  return Response.json({ ok: true })
}
