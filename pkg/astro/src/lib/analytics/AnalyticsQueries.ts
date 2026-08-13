import { CfAnalyticsClient, type CfDateTime } from './CfAnalyticsClient'

export class AnalyticsQueries {
  constructor(
    private readonly client: CfAnalyticsClient,
    private readonly options: { daysOfData: number },
  ) {}

  allByCountry() {
    return this.client
      .query({
        country: 'blob4',
        views: 'SUM(_sample_interval * double1)',
        uniqueSessions: 'COUNT(distinct index1)',
      } as const)
      .where(`timestamp > NOW() - INTERVAL '${this.options.daysOfData}' DAY`)
      .groupBy('country')
      .orderBy('views', 'DESC')
      .execute()
  }

  allByPath() {
    return this.client
      .query({
        path: 'blob1',
        views: 'SUM(_sample_interval * double1)',
        uniqueSessions: 'COUNT(distinct index1)',
      } as const)
      .where(`timestamp > NOW() - INTERVAL '${this.options.daysOfData}' DAY`)
      .groupBy('path')
      .orderBy('views', 'DESC')
      .execute()
  }

  pathnameByDay(pathname: string) {
    return this.client
      .query({
        day: `toStartOfInterval(timestamp, INTERVAL '1' DAY)`,
        views: 'SUM(_sample_interval * double1)',
      })
      .where(`timestamp > NOW() - INTERVAL '${this.options.daysOfData}' DAY`)
      .where(CfAnalyticsClient.sanitize`blob1 = '${pathname}'`)
      .groupBy('day')
      .orderBy('day', 'DESC')
      .execute()
  }

  allByDay() {
    return this.client
      .query({
        day: `toStartOfInterval(timestamp, INTERVAL '1' DAY)`,
        views: 'SUM(_sample_interval * double1)',
        uniqueSessions: 'COUNT(distinct index1)',
      })
      .where(`timestamp > NOW() - INTERVAL '${this.options.daysOfData}' DAY`)
      .groupBy('day')
      .orderBy('day', 'DESC')
      .execute()
  }

  /**
   * this is mostly for debugging purposes - shows the contents of all populated fields
   * in the last day
   */
  rawEvents() {
    return this.client
      .query({
        timestamp: 'timestamp',
        sessionId: 'index1',
        pathname: 'blob1',
        browser: 'blob2',
        os: 'blob3',
        country: 'blob4',
        referrer: 'blob5',
        count: 'double1',
        screenWidth: 'double2',
        screenHeight: 'double3',
        pixelDensity: 'double4',
      })
      .where("timestamp > NOW() - INTERVAL '1' DAY")
      .orderBy('timestamp', 'DESC')
      .execute()
  }
}
