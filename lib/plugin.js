import { apiStorage } from './core/api.storage'
import cacheProvider from './core/cacheProvider'

export default function (context, inject) {
  inject('dataCache', cacheProvider(
    process.server
    ? context.ssrContext.$memoryStorage
    : apiStorage())
  )
}
