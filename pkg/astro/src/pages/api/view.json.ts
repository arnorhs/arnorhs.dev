import type { APIContext } from 'astro'

export const prerender = false

export async function POST({ request, locals }: APIContext) {
  try {
    const body = (await request.json()) as { path: string; referrer: string }
    const { path, referrer } = body

    // Write a data point to the Analytics Engine
    locals.runtime.env.ARNORHS_ANALYTICS.writeDataPoint({
      blobs: [path, referrer, request.headers.get('user-agent')], // Dimensions
      doubles: [1], // Metric, e.g., a count of 1
      indexes: [path], // For sampling/indexing
    })

    // Respond with 204 No Content for a successful submission
    return new Response(null, { status: 204 })
  } catch (e) {
    console.error('Tracking Error:', e)
    return new Response('Error processing request', { status: 400 })
  }
  return Response.json({ ok: true }, { status: 201 })
}
