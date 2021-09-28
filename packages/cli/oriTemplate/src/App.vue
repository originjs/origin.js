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
      v-if="globalStylePluginIsUsed"
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
    // if '@originjs/vite-plugin-global-style' has been imported, you can 
    // set 'globalStylePluginIsUsed = ref(true)' and switch theme by clicking button
    const globalStylePluginIsUsed = ref(<%= globalStylePluginImported %>)

    const isLight = ref(true)

    const changeMode = () => {
      isLight.value = !isLight.value
    }

    return { globalStylePluginIsUsed, isLight, changeMode }
  }
}
</script>

<style scoped>
#app main {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    height: calc(100vh - 3.2rem);
    padding: 1rem;
}

#logo {
    width: 12rem;
    height: 12rem;
    object-fit: cover;
    margin: 4rem 0 1rem 0;
}
</style>
