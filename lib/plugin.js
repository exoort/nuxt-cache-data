import { apiStorage } from './core/api.storage'
import cacheProvider from './core/cacheProvider'
import { mockStorage } from './core/mock.storage'
import { options } from './core/options'

export default function (context, inject) {
  inject('dataCache', cacheProvider(
    process.server
      ? context.ssrContext.$memoryStorage
      : options?.disabled ? mockStorage() : apiStorage()
  )
  )
}
