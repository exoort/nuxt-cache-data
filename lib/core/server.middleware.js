// const express = require('express')
const { memoryCache } = require('../module')

// const app = express()
// app.use(express.json())
//
// app.get('/get', (req, res) => {
//   const cacheKey = req.query.key
//   // memoryCache.set(cacheKey, 'test')
//   // res.json(memoryCache.get(cacheKey))
//   res.json('ok')
// })
//
// module.exports = app

export default async (req, res) => {
  const cacheKey = new URLSearchParams(req._parsedOriginalUrl.query).get('key')
  const data = await memoryCache.get(cacheKey)
  res.setHeader('Content-Type', 'application/json')
  res.write(JSON.stringify(data))
  return res.end()
}
