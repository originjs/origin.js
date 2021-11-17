<template>
  <main :class="isLight ? 'light' : 'dark'">
    <router-view />
    <div>
      <button
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
    </div>
  </main>
</template>

<script>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

export default {
  name: 'App',
  setup: () => {
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

    return { isLight, changeMode, changeLocale }
  }
}
</script>

<%_ if (!globalStylePluginImported) { _%>
<style src="./assets/global-theme.css"></style>
<%_ } _%>
<style scoped>
#app main {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  height: calc(100vh - 3.2rem);
  min-height: 568px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
