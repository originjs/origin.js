import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'
import { createRouter, createWebHistory } from 'vue-router'
import en from './locales/en.json'
import zh from './locales/zh.json'
import App from './App.vue'
import store from './store'
<%_ if (pagesPluginImported) { _%>
import routes from 'virtual:plugin-pages'
<%_ } else { _%>
import Default from './layouts/default.vue'
import Index from './pages/index.vue'
<%_ if (contentPluginImported) { _%>
import Profile from './layouts/profile.vue'
import Content from './pages/content.vue'
<%_ } _%>
<%_ if (markdownPluginImported) { _%>
import Markdown from './pages/markdown.vue'
<%_ } _%>
  
const routes = [
  {
    path: '/',
    component: Default,
    children: [
      { path: '/', component: Index }<%_ if (markdownPluginImported) { _%>,
      { path: '/markdown', component: Markdown }
      <%_ } %>
    ]
  }<%_ if (contentPluginImported) { _%>,
  {
    path: '/',
    component: Profile,
    children: [
      { path: '/content', component: Content }
    ]
  }
  <%_ } %>
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
