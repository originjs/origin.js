import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'
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

createApp(App).use(router).mount('#app')
