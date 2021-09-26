import { ViteDevServer } from 'vite'
import { MODULE_NAME } from './constants'

function getModule(server: ViteDevServer) {
  const { moduleGraph } = server
  const module = moduleGraph.getModuleById(MODULE_NAME)
  if (module) {
    moduleGraph.invalidateModule(module)
    return module
  }
  return
}

export function handleHmr(
  server: ViteDevServer,
  RouteClear: () => void,
  pagesDir: string,
  layoutsDir: string,
) {
  const { ws, watcher } = server

  function reloadRoutes() {
    getModule(server)
    RouteClear()
    ws.send({
      type: 'full-reload',
    })
    return
  }

  function isPageOrLayoutFile(filePath: string): boolean {
    return filePath.startsWith(pagesDir) || filePath.startsWith(layoutsDir)
  }

  const events = ['add', 'unlink', 'change']
  events.forEach(event => {
    watcher.on(event, async file => {
      if (isPageOrLayoutFile(file)) {
        console.log(event, file)
        reloadRoutes()
      }
    })
  })
}
