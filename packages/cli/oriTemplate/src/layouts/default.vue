<template>
  <router-view />
  <p class="text-component-desc text-route">current route: '{{ currentRoute.fullPath }}'</p>
  <p class="text-component-desc text-layout">
    layout default
  </p>
  <Sources :list="sourceOpitons" />
</template>

<script lang="ts">
import { ref } from 'vue'
import Sources from '../components/Sources.vue'
import { useRouter } from 'vue-router'

export default {
  name: 'Default',
  components: {
    Sources
  },
  setup() {
    const sourceOpitons = ref([
      {
        title: 'github',
        link: 'https://github.com/originjs/origin.js'
      }
    ])
    const router = useRouter()
    const { currentRoute } = router
    return { currentRoute, sourceOpitons }
  }
}
</script>
