import { PluginOptions } from './types'
import { Plugin } from 'vite'
import { MODULE_NAME } from './constants'
import { generateRoutes } from './generates'
import { getPages } from './pages'

export default (
  userOptions: PluginOptions = {
    root: process.cwd(),
    pagesDir: 'src/pages',
    layoutsDir: 'src/layouts',
    extensions: ['vue'],
  },
): Plugin => {
  const options: PluginOptions = Object.assign({}, userOptions)

  return {
    name: 'vite:pages',
    enforce: 'pre',
    resolveId(id) {
      if (id === MODULE_NAME) {
        return id
      }
      return null
    },
    async load(id) {
      if (id !== MODULE_NAME) {
        return
      }
      const pages = getPages(options.pagesDir, options.extensions)
      const routes = generateRoutes(pages, options)
      return { routes }
    },
  }
}

export { PluginOptions }
