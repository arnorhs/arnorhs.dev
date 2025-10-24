import type { APIContext } from 'astro'
import {
  trackingRequestBody,
  createWriteDataPointBody,
} from '../../lib/analytics/trackingRequestBody'

export const prerender = false

export async function POST({ request, locals }: APIContext) {
  try {
    const body = trackingRequestBody.parse(await request.json())
    const country = request.headers.get('cf-ipcountry') || 'unknown'

    const dp = createWriteDataPointBody(body, country)
    if (!import.meta.env.DEV) {
      locals.runtime.env.ARNORHS_ANALYTICS.writeDataPoint(dp)
    } else {
      console.info('Not logging datapoint', dp)
    }
  } catch (e) {
    console.error('Tracking Error:', e)
    return Response.json({ error: 'Error processing request' }, { status: 400 })
  }

  return Response.json({ ok: true })
}
