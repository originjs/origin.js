import { createRouter, createWebHistory } from 'vue-router'
import routes from 'plugin-pages'

console.log(routes)

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
