import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'
import en from './locales/en.json'
import zh from './locales/zh.json'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'
import store from './store'
<%_ if (pagesPluginImported) { _%>
import routes from 'virtual:plugin-pages'
<%_ } else { _%>
import Default from './layouts/default.vue'

const routes = [
  { path: '/', component: Default }
]
<%_ } _%>

const router = createRouter({
  history: createWebHistory(),
  routes,
})

const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  locale: 'en',
  fallbackLocale: 'en',
  messages: {
    en,
    zh
  }
})

createApp(App).use(router).use(store).use(i18n).mount('#app')
