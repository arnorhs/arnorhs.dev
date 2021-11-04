const path = require('path')

// Copied from netlify-plugin-gatsby-cache

const getCacheDirs = (constants) => [path.normalize(`${constants.PUBLISH_DIR}/../../resoc/dist`)]

module.exports = {
  async onPreBuild({ constants, utils }) {
    if (process.cwd() === constants.PUBLISH_DIR) {
      utils.build.failBuild(
        `[netlify-plugin-custom-cache] publish folder not set correctly (probably): PUBLISH_DIR: ${constants.PUBLISH_DIR}`,
      )
    }

    const cacheDirs = getCacheDirs(constants)

    if (await utils.cache.restore(cacheDirs)) {
      console.log('[netlify-plugin-custom-cache] << Found cache >>')
    } else {
      console.log('[netlify-plugin-custom-cache] << No cache found >>')
    }
  },

  async onPostBuild({ constants, utils }) {
    const cacheDirs = getCacheDirs(constants)

    if (await utils.cache.save(cacheDirs)) {
      console.log('[netlify-plugin-custom-cache] Stored the resoc cache to speed up future builds.')
    } else {
      console.log('[netlify-plugin-custom-cache] No resoc build found.')
    }
  },
}
