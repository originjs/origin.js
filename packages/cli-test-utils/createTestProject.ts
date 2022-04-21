import fs from 'fs-extra'
import path from 'path'
import { DEMO_PATH, runSync } from './execCommands'
import { cpdir } from '../cli/src/commands/init'
import { SpawnSyncOptionsWithStringEncoding } from 'child_process'

type TestProject = {
  dir: string
  has: (file: string) => boolean
  read: (file: string) => string
  write: (file: string, content: any) => Promise<void>
  rm: (file: string) => void
  clear: () => Promise<void>
}

export default async function createTestProject(
  name: string,
  forSetup = false,
  commandArgs: string[] = [],
): Promise<TestProject> {
  const rootDir: string = path.join(__dirname, DEMO_PATH)
  const projectRoot: string = path.join(rootDir, name)

  const read = (file: string) => {
    return fs.readFileSync(path.join(projectRoot, file), 'utf-8')
  }

  const has = (file: string) => {
    return fs.existsSync(path.join(projectRoot, file))
  }

  const write = async (file: string, content: any) => {
    const targetPath: string = path.join(projectRoot, file)
    const dir: string = path.dirname(targetPath)
    return fs.ensureDir(dir).then(() => fs.writeFileSync(targetPath, content))
  }

  const rm = (file: string) => {
    return fs.removeSync(path.join(projectRoot, file))
  }

  const clear = () => {
    return fs.remove(projectRoot)
  }

  if (forSetup) {
    const sourceDir = path.join(__dirname, 'templates/test_setup')
    return cpdir(sourceDir, rootDir, name).then(() => ({
      dir: projectRoot,
      has,
      read,
      write,
      rm,
      clear,
    }))
  }

  const args: readonly string[] = ['init', name, ...commandArgs]
  const options: SpawnSyncOptionsWithStringEncoding = {
    cwd: rootDir,
    stdio: 'inherit',
    encoding: 'utf-8',
  }

  runSync(args, options);
  return {
    dir: projectRoot,
    has,
    read,
    write,
    rm,
    clear,
  }
}
