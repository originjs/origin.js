import { VitePluginVuePagesOptions } from './types'
import { Plugin } from 'vite'


function pagesPlugin(options: VitePluginVuePagesOptions = {}): Plugin {
  return {
    name: 'vite-plugin-vue-pages',
    enforce: 'pre',
  }

}
