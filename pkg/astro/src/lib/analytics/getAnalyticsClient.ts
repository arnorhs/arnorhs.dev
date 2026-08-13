import { z } from 'zod'
import { CfAnalyticsClient } from './CfAnalyticsClient'

const analyticsConfigSchema = z.object({
  CF_ACCOUNT_ID: z.string().min(1),
  CF_ANALYTICS_API_TOKEN: z.string().min(1),
  CF_ANALYTICS_TABLE_NAME: z.string().min(1),
})

export function getAnalyticsClient(env: Cloudflare.Env) {
  const config = analyticsConfigSchema.safeParse(env)

  if (!config.success) {
    console.error('Missing Cloudflare Analytics configuration', z.treeifyError(config.error))
    throw new Error('Missing Cloudflare Analytics configuration')
  }

  return new CfAnalyticsClient(
    {
      accountId: config.data.CF_ACCOUNT_ID,
      apiToken: config.data.CF_ANALYTICS_API_TOKEN,
    },
    config.data.CF_ANALYTICS_TABLE_NAME,
  )
}
