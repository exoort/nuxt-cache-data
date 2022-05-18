import { memoryCache } from '../module'
import { getSizeOfObject } from './utils'

export default async (req, res) => {
  const data = await memoryCache.getAll()
  const size = getSizeOfObject(data)

  const response = {
    size,
    itemsCount: Object.keys(data).length
  }

  res.setHeader('Content-Type', 'application/json')
  res.write(JSON.stringify(response))
  return res.end()
}
