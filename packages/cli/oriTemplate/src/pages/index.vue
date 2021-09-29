<template>
  <div class="router-link">
    <div><router-link class="text-router-link" to="/login">{{ $t("userLogin") }}</router-link></div>
    <div><router-link class="text-router-link" to="/child">{{ $t("nestedRoutes") }}</router-link></div>
  </div>
  <router-view />
</template>

<script>
export default {
  name: 'Index',
}
</script>
