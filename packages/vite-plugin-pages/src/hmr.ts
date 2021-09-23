import { ViteDevServer } from 'vite'
import { MODULE_NAME } from './constants'

function getModule(server:ViteDevServer){
  const{ moduleGraph } =server
  const module=moduleGraph.getModuleById(MODULE_NAME)
  if (module){
    moduleGraph.invalidateModule(module)
    return module
  }
  return
}

export function handleHmr(server: ViteDevServer,RouteClear:()=> void){
  const { ws,watcher }=server
  function reloadRoutes(){
    getModule(server)
    RouteClear()
    ws.send({
      type:'full-reload',
    })
    return
  }

  watcher.on('add',async(file)=>{
    console.log('add',file)
    reloadRoutes()
  })

  watcher.on('unlink',async(file)=>{
    reloadRoutes()
  })

  watcher.on('change',async(file)=>{
    reloadRoutes()
  })
}
