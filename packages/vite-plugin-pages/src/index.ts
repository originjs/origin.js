import { PluginOptions } from './types'
import { Plugin } from 'vite'
import { MODULE_NAME } from './constants'

export default (userOptions: PluginOptions = {}): Plugin => {
  const DEFAULT_OPTIONS: PluginOptions = {
    root: process.cwd(),
    pagesDir: 'src/pages',
    extension: ['vue'],
  }
  const options: PluginOptions = Object.assign({}, DEFAULT_OPTIONS, userOptions)

  return {
    name: 'vite:pages',
    enforce: 'pre',
    configResolved(config) {
      options.root = config.root
    },
    resolvedId(id) {
      if (id === MODULE_NAME) {
        return id
      }
      return null
    },
    async load(id) {
      if (id !== MODULE_NAME) {
        return
      }
      return await generateRoutes(opitons)
    },
  }
}

export { PluginOptions }
