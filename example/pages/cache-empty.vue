<template>
  <div>
    <nuxt-link to="/">
      home
    </nuxt-link>

    <h1 v-if="written">
      Fetch time: {{ getTime }} ms
    </h1>

    <h2>Cached</h2>

    <pre>{{ {written, written2, written3} }}</pre>
  </div>
</template>

<script>
const mockReq = () => new Promise(resolve => setTimeout(async () => {
  const dynamicData = await import('../mock/exampleData')
  resolve(dynamicData.default)
}, 2000))

export default {
  name: 'CachedPage',
  data () {
    return {
      written: null,
      written2: null,
      written3: null,
      getTime: 0
    }
  },
  async fetch () {
    const startTime = new Date().getTime()

    await Promise.all([
      this.longRequest(),
      this.longRequest2(),
      this.longRequest3()
    ])

    const endTime = new Date().getTime()

    this.getTime = (endTime - startTime)
  },
  methods: {
    async longRequest () {
      this.written = await this.$dataCache.fetch(
        'written',
        () => null
      )
    },
    async longRequest2 () {
      this.written2 = await this.$dataCache.fetch(
        'written2',
        () => mockReq()
      )
    },
    async longRequest3 () {
      this.written3 = await this.$dataCache.fetch(
        'written3',
        () => mockReq()
      )
    }
  }
}
</script>
