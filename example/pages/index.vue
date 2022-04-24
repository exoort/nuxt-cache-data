<template>
  <div>
    Works! {{ written }}
  </div>
</template>

<script>
export default {
  data () {
    return {
      written: null
    }
  },
  async fetch () {
    this.written = await this.$dataCache.fetch('test', [
      {
        id: 1,
        title: 'Coding in Javascript',
        description: 'Working with functions in JavaScript',
        completed: false
      },
      {
        id: 2,
        title: 'Cooking Supper',
        description: 'Preparing rice and chicken',
        completed: false
      },
      {
        id: 3,
        title: 'Taking a walk',
        description: 'Easy time at the park',
        completed: false
      },
      {
        id: 4,
        title: 'Watching Netflix',
        description: 'Enjoying the new premiered series',
        completed: false
      }
    ])
  },
  async mounted () {
    const res = await this.$dataCache.get('test')
    console.log(res)
  }
}
</script>
