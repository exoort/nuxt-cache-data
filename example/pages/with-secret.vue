<template>
  <div>
    <nuxt-link to="/">
      home
    </nuxt-link>

    <h1 v-if="written">
      Fetch time: {{ getTime }} ms
    </h1>

    <h2>Cached</h2>

    <pre>{{ written }}</pre>
  </div>
</template>

<script>
export default {
  name: 'ExamplePage',
  data () {
    return {
      written: null,
      getTime: 0
    }
  },
  async fetch () {
    const startTime = new Date().getTime()

    const mockReq = () => new Promise(resolve => setTimeout(async () => {
      const dynamicData = await import('../mock/exampleData')
      resolve(dynamicData.default)
    }, 2000))

    this.written = await this.$dataCache.fetch(
      { key: 'secretPosts', secret: 'token' },
      () => mockReq()
    )

    const endTime = new Date().getTime()

    this.getTime = (endTime - startTime)
  }
}
</script>
