<template>
  <div class="router-link">
    <div><router-link class="text-router-link" to="/login">User login</router-link></div>
    <div><router-link class="text-router-link" to="/child">Nested routes</router-link></div>
  </div>
  <router-view />
</template>

<script>
export default {
  name: 'Index',
}
</script>
