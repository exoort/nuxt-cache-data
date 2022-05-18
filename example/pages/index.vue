<template>
  <div>
    <div>
      <nuxt-link to="/cached">
        Cached page
      </nuxt-link>
    </div>
    <br>
    <div>
      <nuxt-link to="/with-secret">
        Cached page with secret
      </nuxt-link>
    </div>
    <br>
    <div>
      <nuxt-link to="/no-cache">
        No cache
      </nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ExamplePage'
}
</script>
