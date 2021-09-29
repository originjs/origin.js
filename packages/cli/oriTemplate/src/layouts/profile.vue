<template>
  <div class="router-link">
    <div><router-link class="text-router-link" to="/">Home</router-link></div>
    <div><router-link class="text-router-link" to="/login">Sign out</router-link></div>
  </div>
  <router-view />
</template>

<script>
export default {
  name: 'Profile'
}
</script>

<style>
.router-link {
  margin: 0 10px 0 10px;
}
</style>
