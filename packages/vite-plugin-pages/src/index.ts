import { PluginOptions } from './types'
import { Plugin } from 'vite'
import { MODULE_NAME } from './constants'
import { getPages } from './pages'
import { generateRoutes } from './generates'

export default (userOptions: PluginOptions = {}): Plugin => {
  const DEFAULT_OPTIONS: PluginOptions = {
    root: process.cwd(),
    pagesDir: 'src/pages',
    layoutsDir: 'src/layouts',
    extension: ['vue'],
  }
  const options: PluginOptions = Object.assign({}, DEFAULT_OPTIONS, userOptions)

  return {
    name: 'vite:pages',
    enforce: 'pre',
    configResolved(config) {
      options.root = config.root
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
      const pages = getPages(options.pagesDir)
      return await generateRoutes(pages, options)
    },
  }
}

export { PluginOptions }
