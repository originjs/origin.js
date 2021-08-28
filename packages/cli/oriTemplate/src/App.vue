<template>
  <main :class="isDark ? 'dark' : 'light'">
    <div>
      <img
        alt="Origin.js logo"
        src="./assets/originjs.png"
        id="logo"
      >
    </div>
    <Home />
    <button
      type="button"
      @click="isDark = !isDark"
      class="normal-btn theme-ctrl"
    >
      {{ isDark ? 'light' : 'dark' }} mode
    </button>
  </main>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue'
import Home from './layouts/Home.vue'

export default defineComponent({
  name: 'App',
  components: {
    Home
  },
  setup: () => {
    const isDark = ref(false)
    return { isDark }
  }
})
</script>
