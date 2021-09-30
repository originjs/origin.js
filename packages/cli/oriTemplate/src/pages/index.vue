<template>
  <div class="router-link">
    <div><router-link class="text-router-link" to="/login">{{ $t("userLogin") }}</router-link></div>
    <div><router-link class="text-router-link" to="/child">{{ $t("nestedRoutes") }}</router-link></div>
    <%_ if (globalStylePluginImported) { _%>
    <div><router-link class="text-router-link" to="/content">{{ $t("content") }}</router-link></div>
    <%_ } _%>
  </div>
  <router-view />
</template>

<script>
export default {
  name: 'Index',
}
</script>
