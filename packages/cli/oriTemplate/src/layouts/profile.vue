<template>
  <div>
    <span class="router-link"><router-link to="/">Home</router-link></span>
    <span class="router-link"><router-link to="/login">Sign out</router-link></span>
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