const { memoryCache } = require('../module')

export default async (req, res) => {
  const cacheKey = new URLSearchParams(req._parsedOriginalUrl.query).get('key')
  const data = await memoryCache.get(cacheKey)
  res.setHeader('Content-Type', 'application/json')
  res.write(JSON.stringify(data))
  return res.end()
}
