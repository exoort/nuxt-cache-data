import { dataCache as clientDataCache } from './core.client.js'
import { dataCache as serverDataCache } from './core.server.js'

export default function dataCache () {
  return process.server ? serverDataCache() : clientDataCache()
}
