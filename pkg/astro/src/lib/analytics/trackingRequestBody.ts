import z from 'zod'

export const trackingRequestBody = z.object({
  browser: z.string(),
  os: z.string(),
  screenWidth: z.number(),
  screenHeight: z.number(),
  pixelDensity: z.number(),
  sessionId: z.string(),
  // max limit of 96 characters according to
  // https://developers.cloudflare.com/analytics/analytics-engine/limits/
  pathname: z.string(),
  referrer: z.string(),
})

export type TrackingRequestBody = z.infer<typeof trackingRequestBody>

export type AnalyticsData = {
  blobs: [path: string, browser: string, os: string, country: string, referrer: string]
  doubles: [count: number, screenWidth: number, screenHeight: number, pixelDensity: number]
  indexes: [sessionId: string]
}

export function createWriteDataPointBody(
  data: TrackingRequestBody,
  country: string,
): AnalyticsData {
  return {
    blobs: [data.pathname, data.browser, data.os, country || 'unknown', data.referrer],
    doubles: [1, data.screenWidth, data.screenHeight, data.pixelDensity],
    indexes: [data.sessionId],
  }
}
