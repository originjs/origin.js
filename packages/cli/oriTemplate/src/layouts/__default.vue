<template>
  <div>
    <img
      alt="Origin.js logo"
      src="../assets/originjs.png"
      class="logo logo-large"
    >
    <h2>Origin.js</h2>
    <p>{{ $t("introduction") }}</p>
    <router-view />
    <p class="text-component-desc text-route">
      {{ $t("currentRoute") }}: '{{ currentRoute.fullPath }}'
    </p>
    <sources :list="sourceOpitons" />
  </div>
</template>

<script>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
<%_ if (!componentsPluginImported) { _%>
import Sources from '../components/Sources.vue'
<%_ } _%>

export default {
  name: 'Default',
  setup() {
    const sourceOpitons = reactive([
      {
        title: 'github',
        link: 'https://github.com/originjs/origin.js'
      },
      {
        title: 'docs',
        link: 'https://originjs.org/'
      }
    ])

    const router = useRouter()
    const { currentRoute } = router

    return { currentRoute, sourceOpitons }
  }<%_ if (!componentsPluginImported) { _%>,
  components: {
    Sources
  }<% } %>
}
</script>
