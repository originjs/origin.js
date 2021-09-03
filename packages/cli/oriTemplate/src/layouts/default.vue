<template>
  <router-view />
  <p class="text-component-desc text-layout">
    layout default
  </p>
  <Sources :list="sourceOpitons" />
</template>

<script lang="ts">
import { ref } from 'vue'
import Sources from '../components/Sources.vue'

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
    return { sourceOpitons }
  }
}
</script>
