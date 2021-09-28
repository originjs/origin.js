import { createApp } from 'vue'
import App from './App.vue'
<%_ if (hasPagePlugin) { _%>
import { createRouter, createWebHistory } from 'vue-router'
import routes from 'virtual:plugin-pages'

const router = createRouter({
  history: createWebHistory(),
  routes,
})

createApp(App).use(router).mount('#app')
<%_ } else { _%>

createApp(App).mount('#app')
<%_ } _%>
