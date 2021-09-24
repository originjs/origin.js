import { PluginOptions, Route } from './types'
import { Plugin } from 'vite'
import { MODULE_NAME } from './constants'
import { generateCode, generateRoutes } from './generates'
import { getPages } from './pages'
import { handleHmr } from './hmr'

export default (
  userOptions: PluginOptions = {
    root: process.cwd(),
    pagesDir: 'src/pages',
    layoutsDir: 'src/layouts',
    extensions: ['vue'],
  },
): Plugin => {
  const options: PluginOptions = Object.assign({}, userOptions)
  let routes: Route[] | null = null

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
      handleHmr(server, () => {
        routes = null
      })
    },
    async load(id) {
      if (id !== MODULE_NAME) {
        return
      }
      if (!routes) {
        const pages = getPages(options.pagesDir, options.extensions)
        routes = generateRoutes(pages, options)
      }

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
