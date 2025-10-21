export type CfDateTime = `${number}-${number}-${number} ${number}:${number}:${number}`

export type AnalyticsResults<Schema> = {
  meta: {
    [K in keyof Schema]: {
      name: K
      type: Schema[K]
    }
  }[keyof Schema][]
  data: {
    [K in keyof Schema]: Schema[K]
  }[]
  rows: number
  rows_before_limit_at_least: number
}

export type CfAnalyticsConfig = {
  accountId: string
  apiToken: string
}

export type QueryResults<Schema> =
  | {
      type: 'success'
      results: AnalyticsResults<Schema>
    }
  | {
      type: 'error'
      message: string
    }

export class CfAnalyticsClient {
  constructor(
    private readonly cfg: CfAnalyticsConfig,
    public readonly TABLE_NAME: string,
  ) {}

  async rawQuery<Schema>(sql: string) {
    const results = await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${this.cfg.accountId}/analytics_engine/sql`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${this.cfg.apiToken}`,
        },
        body: `${sql} FORMAT JSON`,
      },
    )

    return (
      results.ok
        ? { type: 'success', results: await results.json() }
        : { type: 'error', message: await results.text() }
    ) as QueryResults<Schema>
  }

  query<const Select extends { [key: string]: string }>(sel: Select) {
    return new QueryBuilder(this.TABLE_NAME, sel, (sql) =>
      this.rawQuery<QuerySchemaFromSelect<Select>>(sql),
    )
  }

  static sanitize(template: TemplateStringsArray, ...params: (string | number)[]) {
    for (let i = 0; i < params.length; i++) {
      const p = params[i]
      params[i] = typeof p === 'string' ? p.replace(/['\\]+/g, '') : p
    }

    return String.raw({ raw: template }, ...params)
  }
}

type InferTypeFromString<T> = T extends `${string}double${number}${string}`
  ? number
  : T extends `${string}COUNT(${string}`
    ? number
    : T extends `${string}timestamp${string}`
      ? CfDateTime
      : T extends `${string}index1${string}`
        ? string
        : T extends `${string}blob${number}${string}`
          ? string
          : never

type QuerySchemaFromSelect<T> = {
  [K in keyof T]: InferTypeFromString<T[K]>
} & {}

// type Prettify<T> = {
//   [K in keyof T]: T[K]
// } & {}

class QueryBuilder<Sel, T> {
  constructor(
    private readonly tableName: string,
    private readonly select: Sel,
    private readonly onExec: (sql: string) => T,
  ) {}

  private readonly q = {
    where: [] as string[],
    groupBy: null as keyof Sel | null,
    orderBy: null as [keyof Sel, 'ASC' | 'DESC'] | null,
  }

  where(condition: string) {
    this.q.where.push(condition)
    return this
  }

  groupBy(field: keyof Sel) {
    this.q.groupBy = field
    return this
  }

  orderBy(field: keyof Sel, direction: 'ASC' | 'DESC' = 'ASC') {
    this.q.orderBy = [field, direction]
    return this
  }

  /**
   * You know how it is - you always end up building an ORM
   */
  execute() {
    const { where, groupBy, orderBy } = this.q

    const selectClause = Object.entries(this.select as Record<string, string>)
      .map(([alias, expr]) => `  ${expr} AS ${alias}`)
      .join(',\n')

    const whereClause = where.length > 0 ? `WHERE ${where.join(' AND ')}` : ''
    const groupByClause = groupBy ? `GROUP BY ${groupBy as string}` : ''
    const orderByClause = orderBy ? `ORDER BY ${orderBy.join(' ')}` : ''

    let sql = 'SELECT\n'
    sql += selectClause + '\n'
    sql += `FROM "${this.tableName}"\n`
    if (whereClause) {
      sql += whereClause + '\n'
    }
    if (groupByClause) {
      sql += groupByClause + '\n'
    }
    if (orderByClause) {
      sql += orderByClause
    }

    return this.onExec(sql)
  }
}
