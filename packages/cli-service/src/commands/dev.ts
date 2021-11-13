import pkgDir from 'pkg-dir'
import chalk from 'chalk'
import { createServer, ViteDevServer } from 'vite'
import { DevPrinter } from '../Printer'
import { loadPackageJson } from '../utils/file'

export default async function (
  execPath?: string,
): Promise<ViteDevServer | null> {
  const rootDir: string | undefined = execPath
    ? execPath
    : await pkgDir(process.cwd())
  if (!rootDir) {
    return null
  }

  const print = new DevPrinter(rootDir)
  const packageConfig = loadPackageJson(rootDir)
  if (packageConfig) {
    const { devDependencies = {}, dependencies = {} } = packageConfig
    if (devDependencies.vite || dependencies.vite) {
      const server: ViteDevServer = await createServer(await print.getSchema())
      return server
    } else {
      console.log("Cannot find module 'vite', try running: npm install vite")
      console.log(chalk.red('Server start failed'))
      console.log()
      return null
    }
  } else {
    console.log(chalk.red('Server start failed'))
    console.log()
    return null
  }
}
