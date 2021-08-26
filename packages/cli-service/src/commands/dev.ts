import pkgDir from 'pkg-dir'
import { createServer } from 'vite'
import { DevPrinter } from '../Printer'

export default async function () {
  const rootDir = await pkgDir(process.cwd())
  if (!rootDir) {
    return
  }

  const print = new DevPrinter(rootDir)
  if (!print.localConfig) {
    console.log(`file not found: '${rootDir}\\vite.config.js'`)
    console.log('server start failed')
    console.log()
    return
  }
  const server = await createServer(print.getSchema())
  await server.listen()
}
