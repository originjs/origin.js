<template>
  <div class="header">
    <span class="router-link"><router-link to="/">Home</router-link></span>
    <span class="router-link"><router-link to="/login">Sign out</router-link></span>
  </div>
  <router-view />
</template>

<script>
export default {}
</script>

<style>
.header {
  text-align: center;
}
.router-link {
  margin: 0 10px 0 10px;
}
</style>
