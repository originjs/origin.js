<template>
  <div>
    <router-view />
    <p class="text-component-desc text-route">current route: '{{ currentRoute.fullPath }}'</p>
    <sources :list="sourceOpitons" />
  </div>
</template>

<script lang="ts">
import { reactive } from 'vue'
import { useRouter } from 'vue-router'

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
        link: 'https://originjs.github.io/docs/'
      }
    ])
  
    const router = useRouter()
    const { currentRoute } = router
  
    return { currentRoute, sourceOpitons }
  }
}
</script>
