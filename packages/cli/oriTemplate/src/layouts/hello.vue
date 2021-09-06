<template>
  <router-view />
    <p class="text-component-desc text-route">current route: '{{ currentRoute.fullPath }}'</p>
  <p class="text-component-desc text-layout">
    layout hello
  </p>
  <p class="text-p">
    Now edit files to create your project! &#128515;
  </p>
</template>

<script lang="ts">
import { useRouter } from 'vue-router'

export default {
  name: 'Hello',
  setup() {
    const router = useRouter()
    const { currentRoute } = router
    return { currentRoute }
  }
}
</script>
