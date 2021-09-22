import { createRouter, createWebHistory } from 'vue-router'
// @ts-ignore ignore TS2307: Cannot find module....
import routes from 'virtual:plugin-pages'

console.log(routes)

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
