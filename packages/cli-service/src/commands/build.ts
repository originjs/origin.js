import pkgDir from 'pkg-dir'
import { build } from 'vite'
import { BuildPrinter } from '../Printer'

export default async function () {
  const rootDir = await pkgDir(process.cwd())
  if (!rootDir) {
    return
  }

  const print = new BuildPrinter(rootDir)
  await build(print.getSchema())
}
