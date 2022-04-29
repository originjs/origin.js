<%_ if (store === 'pinia') { _%>
import { createPinia } from 'pinia'

export default createPinia()
<%_ } else if (store === 'vuex') { _%>
import { createStore } from 'vuex'

export default createStore({
  state: {},
  mutations: {},
  actions: {},
  modules: {},
})
<%_ } _%>