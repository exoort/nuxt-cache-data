import { memoryCache } from '../module'

export default async (req, res) => {
  const params = new URLSearchParams(req._parsedOriginalUrl.query)

  const key = params.get('key')
  const secret = params.get('secret') || null

  const data = await memoryCache.get({ key, secret })

  res.setHeader('Content-Type', 'application/json')
  res.write(JSON.stringify(data))
  return res.end()
}
