<template>
  <div>
    <h2>
      <router-link to="/content">
        content example
      </router-link>
    </h2>
    <h2>
      <router-link to="/globalStyle">
        global style example
      </router-link>
    </h2>
    <h2>
      <router-link to="/404">
        404 example
      </router-link>
    </h2>
    <h2>
      <router-link to="/login">
        login example
      </router-link>
    </h2>
    <h2>
      <router-link to="/child">
        nested routes
      </router-link>
    </h2>
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'Index',
}
</script>

<style scoped>

</style>

<layout>
layout: empty
</layout>
