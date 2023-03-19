import 'jest-extended'
import { beforeAll, describe, expect, it } from '@jest/globals'
import { getPostCollection } from './getPostCollection'
import { Post } from './types'

describe('getPostCollection', () => {
  let allItems: Post[]
  beforeAll(async () => {
    allItems = await getPostCollection()
  })

  describe('allItems', () => {
    it('allItems is a seemingly ok array', () => {
      expect(allItems).toBeTruthy()
      expect(allItems).toBeInstanceOf(Array)
      expect(allItems.length).toBeGreaterThan(100)
    })

    it('every post works', () => {
      for (const post of allItems) {
        expect(post.uriId).toContain(post.slug)

        expect(post).toMatchObject({
          uriId: expect.stringMatching(/^20[0-9]{2}\-[0-9]{2}\-[0-9]{2}\/[a-zA-Z0-9\-]+$/),
          htmlBody: expect.any(String),
          contentHash: expect.stringMatching(/^[a-f0-9]{32}$/),
          summary: expect.any(String),
          // TODO: I tried https://jest-extended.jestcommunity.dev/docs/getting-started/typescript
          //       and https://github.com/jest-community/jest-extended/tree/main/examples/typescript/all
          // @ts-ignore
          title: expect.toSatisfy((s: string) => s.length >= 2),
          publishedDate: expect.any(Date),
          slug: expect.stringMatching(/^[a-z0-9A-Z\-]+$/),
        })
      }
    })
  })
})
