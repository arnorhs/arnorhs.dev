import Koa from 'koa'
import Router from '@koa/router'
import logger from 'koa-logger'
import json from 'koa-json'
import { getPostCollection } from '@arnorhs/posts'

const router = Router()

router.get('/posts', async (ctx, next) => {
  ctx.body = ctx.postCollection.allItems()

  await next()
})

router.get('/post/:permalink', async (ctx, next) => {
  ctx.body = ctx.postCollection.findItem(ctx.params.permalink)

  await next()
})

const app = new Koa()

app.use(async (ctx, next) => {
  ctx.postCollection = await getPostCollection()

  await next()
})

app.use(json()).use(logger()).use(router.routes()).use(router.allowedMethods())

const PORT = 1337

app.listen(PORT, () => {
  console.log(`posts api started on port ${PORT}`)
})
