<template>
  <div>
    Works!
    <h2>Written to cache</h2>
    <p>{{ written }}</p>

    <h2>Got from cache</h2>
    <p>{{ cache }}</p>
  </div>
</template>

<script>
export default {
  name: 'ExamplePage',
  data () {
    return {
      cache: null,
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
    this.cache = await this.$dataCache.get('test')
  }
}
</script>
