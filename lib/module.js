const { readdirSync } = require('fs')
const { resolve, join } = require('path')
const { memoryStorage } = require('./core/memory.storage')
const { mockStorage } = require('./core/mock.storage')

const memoryCache = memoryStorage()

/**
 * @function
 * @type {ICacheModule}
 * @param {ModuleOptions} moduleOptions
 */
const cacheModule = function (moduleOptions) {
  const defaultOptions = {
    apiUrl: '/cache-api'
  }

  const options = {
    ...defaultOptions,
    ...this.options.dataCache,
    ...moduleOptions
  }

  const writeEmpty = Boolean(options?.writeEmpty)
  const disabled = Boolean(options?.disabled)

  this.nuxt.hook('vue-renderer:ssr:prepareContext', (ssrContext) => {
    ssrContext.$memoryStorage = disabled ? mockStorage() : memoryCache({ writeEmpty, disabled })
  })

  this.nuxt.options.alias['~dataCache'] = __dirname
  this.nuxt.options.build.transpile.push(__dirname)

  this.addPlugin({
    src: resolve(__dirname, 'plugin.js'),
    fileName: 'dataCache/index.js',
    options
  })

  // sync all of the files and folders to revelant places in the nuxt build dir (.nuxt/)
  const foldersToSync = ['core']
  for (const pathString of foldersToSync) {
    const path = resolve(__dirname, pathString)
    for (const file of readdirSync(path)) {
      this.addTemplate({
        src: resolve(path, file),
        fileName: join('dataCache', pathString, file),
        options
      })
    }
  }

  this.addServerMiddleware({ path: '/cache-api/get', handler: resolve(__dirname, './core/api-get.middleware.js') })
  this.addServerMiddleware({ path: '/cache-api/stats', handler: resolve(__dirname, './core/api-stats.middleware.js') })
}

module.exports = cacheModule
module.exports.memoryCache = memoryCache()
module.exports.meta = require('../package.json')
