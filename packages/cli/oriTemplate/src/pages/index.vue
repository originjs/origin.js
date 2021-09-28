<template>
  <h4 class="text-t4">Origin.js</h4>
  <p class="text-p">A simple and powerful Vue.js web application framework.</p>
  <div>
    <span class="router-link-span"
      ><router-link to="/login">User login</router-link></span
    >
    <span class="router-link-span"
      ><router-link to="/child">Nested routes</router-link></span
    >
  </div>
  <router-view />
</template>

<script>
export default {
  name: 'Index',
}
</script>
