import { apiStorage } from './core/api.storage'
import { mockStorage } from './core/mock.storage'

export default function (context, inject) {
  let cacheProvider = process.server
    ? context.ssrContext.$memoryCache
    : apiStorage()

  if (!cacheProvider) {
    cacheProvider = mockStorage()
  }

  inject('dataCache', cacheProvider)
  context.app.$dataCache = cacheProvider
}
