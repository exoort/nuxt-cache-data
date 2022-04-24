const { resolve } = require('path')

setInterval(() => {
  const memoryUsage = process.memoryUsage()

  const f = value => (!value ? '-' : `${Math.round(value / 1048576)} MB`)

  // eslint-disable-next-line no-console
  console.log(
    `${new Date().toTimeString().substr(0, 8)} Memory usage: ${f(memoryUsage.heapUsed)} (RSS: ${f(memoryUsage.rss)}) - total heap: ${f(memoryUsage.heapTotal)} - external: ${f(memoryUsage.external)} - array buffers: ${f(memoryUsage.arrayBuffers)}`
  )
}, 5000)

module.exports = {
  rootDir: resolve(__dirname, '..'),
  buildDir: resolve(__dirname, '.nuxt'),
  srcDir: __dirname,
  modules: [
    { handler: require('../src/module') }
  ]
}
