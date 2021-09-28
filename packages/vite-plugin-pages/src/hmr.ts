import { ViteDevServer } from 'vite'
import { MODULE_NAME } from './constants'
import { updatePages } from './pages'
import { PluginOptions } from './types'
import { join } from 'path'
import { updateLayouts } from './parser'
import { log, replaceWithSlash } from './utils'

function getModule(server: ViteDevServer) {
  const { moduleGraph } = server
  const module = moduleGraph.getModuleById(MODULE_NAME)
  if (module) {
    moduleGraph.invalidateModule(module)
    return module
  }
  return
}

export function handleHmr(server: ViteDevServer, options: PluginOptions) {
  const { ws, watcher } = server
  const { root, pagesDir, layoutsDir } = options
  const pagesDirFullPath = replaceWithSlash(join(root, pagesDir)) + '/'
  const layoutsDirFullPath = replaceWithSlash(join(root, layoutsDir)) + '/'

  function reloadRoutes() {
    getModule(server)
    ws.send({
      type: 'full-reload',
    })
    return
  }

  function isPageFile(filePath: string): boolean {
    return filePath.startsWith(pagesDirFullPath)
  }

  function isLayoutFile(filePath: string): boolean {
    return filePath.startsWith(layoutsDirFullPath)
  }

  function getPathFromPagesDir(filePath: string): string {
    return filePath.replace(pagesDirFullPath, '')
  }

  function getPathFromLayoutsDir(filePath: string): string {
    return filePath.replace(layoutsDirFullPath, '')
  }

  const events = ['add', 'unlink', 'change']
  events.forEach(event => {
    watcher.on(event, async file => {
      // only handle page or layout file event
      file = replaceWithSlash(file)
      const isPage = isPageFile(file)
      const isLayout = isLayoutFile(file)
      if (!isPage && !isLayout) {
        return
      }

      log(`hmr: ${event} ${file}`)
      if (isPage) {
        const pathFromPagesDir = getPathFromPagesDir(file)
        updatePages(event, pagesDir, pathFromPagesDir)
        reloadRoutes()
      } else if (isLayout) {
        const pathFromLayoutsDir = getPathFromLayoutsDir(file)
        updateLayouts(event, layoutsDir, pathFromLayoutsDir)
        reloadRoutes()
      }
    })
  })
}
