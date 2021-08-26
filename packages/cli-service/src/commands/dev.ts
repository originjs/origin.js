import pkgDir from 'pkg-dir'
import fse from 'fs-extra'
import chalk from 'chalk'
import { createServer, ViteDevServer } from 'vite'
import { DevPrinter } from '../Printer'

export default async function (execPath?: string) {
  const rootDir: string | undefined = execPath ? execPath : await pkgDir(process.cwd())
  if (!rootDir) {
    return
  }

  const print = new DevPrinter(rootDir)
  const packageConfig = loadPackageJson(rootDir)
  if (packageConfig) {
    const { devDependencies = {}, dependencies = {} } = packageConfig
    if (devDependencies.vite || dependencies.vite) {
      const server: ViteDevServer = await createServer(print.getSchema())
      await server.listen()
    } else {
      console.log('Cannot find module \'vite\', try running: npm install vite')
      console.log(chalk.red('Server start failed'))
      console.log()
    }
  } else {
    console.log(chalk.red('Server start failed'))
    console.log()
  }

}

function loadPackageJson(rootDir: string) {
  if (fse.pathExistsSync(`${rootDir}/package.json`)) {
    return fse.readJsonSync(`${rootDir}/package.json`)
  } else {
    return null
  }
}
