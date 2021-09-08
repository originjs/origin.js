<template>
  <main :class="isLight ? 'light' : 'dark'">
    <div>
      <img
        alt="Origin.js logo"
        src="./assets/originjs.png"
        id="logo"
      >
    </div>
    <router-view />
    <button
      type="button"
      @click="changeMode"
      class="normal-btn theme-ctrl-btn"
    >
      {{ !isLight ? 'light' : 'dark' }} mode
    </button>
  </main>
</template>

<script lang="ts">
import { ref } from 'vue'

export default {
  name: 'App',
  setup: () => {
    const isLight = ref(true)

    const changeMode = () => {
      isLight.value = !isLight.value
    }

    return { isLight, changeMode }
  }
}
</script>
