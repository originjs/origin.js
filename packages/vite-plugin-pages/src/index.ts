import { PluginOptions } from './types'
import { Plugin } from 'vite'
import { MODULE_NAME } from './constants'
import { generateCode, generateRoutes } from './generates'
import { initPages, pages } from './pages'
import { handleHmr } from './hmr'
import { replaceWithSlash } from './utils'
import { initLayouts, layouts } from './parser'

export default (
  userOptions: PluginOptions = {
    root: replaceWithSlash(process.cwd()),
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
    configureServer(server) {
      handleHmr(server, options)
    },
    async load(id) {
      if (id !== MODULE_NAME) {
        return
      }
      const { pagesDir, layoutsDir, extensions } = options
      if (pages.sortedPages.length === 0) {
        initPages(pagesDir, extensions)
      }
      if (layouts.size === 0) {
        initLayouts(layoutsDir, extensions)
      }
      const routes = generateRoutes(options)
      return generateCode(routes)
    },
    async transform(_code, id) {
      if (!/vue&type=layout/.test(id)) {
        return
      }
      return {
        code: 'export default {}',
        map: null,
      }
    },
  }
}

export { PluginOptions }
