import pkgDir from 'pkg-dir'
import chalk from 'chalk'
import { createServer, ViteDevServer } from 'vite'
import { DevPrinter } from '../Printer'
import { loadPackageJson } from '../utils/file'

type DevCliOptions = {
  browser?: boolean
  autoClose?: string
}

export default async function dev(
  execPath?: string,
  options?: DevCliOptions,
) {
  const rootDir: string | undefined = execPath
    ? execPath
    : await pkgDir(process.cwd())
  if (!rootDir) {
    return false
  }

  const print = new DevPrinter(rootDir)
  const packageConfig = loadPackageJson(rootDir)
  if (packageConfig) {
    const { devDependencies = {}, dependencies = {} } = packageConfig
    if (devDependencies.vite || dependencies.vite) {
      const config = await print.getSchema()
      if (!options?.browser && config.server) {
        config.server.open = false
      }
      const server: ViteDevServer = await createServer(config)
      server.listen()
      if (options?.autoClose) {
        setTimeout(() => {
          server.close()
        }, parseInt(options.autoClose))
      }
    } else {
      console.log("Cannot find module 'vite', try running: npm install vite")
      console.log(chalk.red('Server start failed'))
      console.log()
      return false
    }
  } else {
    console.log(chalk.red('Server start failed'))
    console.log()
    return false
  }
}
