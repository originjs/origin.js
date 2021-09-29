<template>
  <main :class="isLight ? 'light' : 'dark'">
    <div>
      <img
        alt="Origin.js logo"
        src="./assets/originjs.png"
        id="logo"
      >
    </div>
    <h2 class="text-t2">Origin.js</h2>
    <p class="text-p">{{ $t("introduction") }}</p>
    <router-view />
    <button
      v-if="globalStylePluginIsUsed"
      type="button"
      @click="changeMode"
      class="normal-btn theme-ctrl-btn"
    >
      {{ !isLight ? $t('lightMode') : $t('darkMode') }}
    </button>
    <button
      type="button"
      @click="changeLocale"
      class="normal-btn theme-ctrl-btn"
    >
      {{ $t("changeLanguage") }}
    </button>
  </main>
</template>

<script lang="ts">
import { ref } from 'vue'
import {useI18n} from "vue-i18n";

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

    const { locale } = useI18n()
    const changeLocale = () => {
      if (locale.value === 'en') {
        locale.value = 'zh'
      } else if (locale.value === 'zh') {
        locale.value = 'en'
      }
    }

    return { globalStylePluginIsUsed, isLight, changeMode, changeLocale }
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
