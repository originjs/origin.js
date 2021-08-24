import { Page, PluginOptions } from './types'
import { Plugin } from 'vite'
import { MODULE_NAME } from './constants'
import { generateRoutes } from './generates'
import { getPages } from './pages'

export default (userOptions: PluginOptions = {}): Plugin => {
  const DEFAULT_OPTIONS: PluginOptions = {
    root: process.cwd(),
    pagesDir: 'src/pages',
    extension: ['vue'],
  }
  const options: PluginOptions = Object.assign({}, DEFAULT_OPTIONS, userOptions)
  let pages: Page[]

  return {
    name: 'vite:pages',
    enforce: 'pre',
    configResolved(config) {
      options.root = config.root
      const pagesDir = 'src/pages'
      pages = getPages(pagesDir)
    },
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
      const routes = generateRoutes(pages)
      return { routes }
    },
  }
}

export { PluginOptions }
