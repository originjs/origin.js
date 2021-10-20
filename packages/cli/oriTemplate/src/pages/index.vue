<template>
  <router-view />
  <div class="router-link">
    <%_ if (pagesPluginImported) { _%>
    <div><router-link class="text-router-link" to="/login">{{ $t("userLogin") }}</router-link></div>
    <div><router-link class="text-router-link" to="/child">{{ $t("nestedRoutes") }}</router-link></div>
    <%_ } _%>
    <%_ if (contentPluginImported) { _%>
    <div><router-link class="text-router-link" to="/content">{{ $t("content") }}</router-link></div>
    <%_ } _%>
    <%_ if (markdownPluginImported) { _%>
    <div><router-link class="text-router-link" to="/markdown">{{ $t("markdown") }}</router-link></div>
    <%_ } _%>
  </div>
</template>

<script>
export default {
  name: 'Index'
}
</script>
