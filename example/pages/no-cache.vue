<template>
  <div>
    <nuxt-link to="/">
      home
    </nuxt-link>

    <h2>Written to cache</h2>
    <pre>{{ written }}</pre>
  </div>
</template>

<script>
export default {
  name: 'NoCachePage',
  data () {
    return {
      cache: null,
      written: null
    }
  },
  async fetch () {
    const mockReq = () => new Promise(resolve => setTimeout(async () => {
      const dynamicData = await import('../mock/exampleData')
      resolve(dynamicData.default)
    }, 2000))

    this.written = await mockReq()
  }
}
</script>
