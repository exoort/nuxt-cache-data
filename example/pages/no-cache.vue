<template>
  <div>
    Works!
    <h2>Written to cache</h2>
    <p>{{ written }}</p>

    <h2>Got from cache</h2>
    <p>{{ cache }}</p>

    <nuxt-link to="/">
      Cached page
    </nuxt-link>

    <nuxt-link to="/external">
      Another page
    </nuxt-link>
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
