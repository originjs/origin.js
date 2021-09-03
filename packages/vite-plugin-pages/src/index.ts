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
      const generatedCode = JSON.stringify(routes).replace(
        /"component":("(.*?)")/g,
        (str, replaceFrom, replaceTo) => {
          return str.replace(replaceFrom, replaceTo)
        },
      )
      return `const routes = ${generatedCode};\n export default routes;`
    },
  }
}

export { PluginOptions }
