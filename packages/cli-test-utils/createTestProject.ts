import fs from 'fs-extra'
import path from 'path'
import { Options } from 'execa'
import run, { DEMO_PATH } from './execCommands'

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
  commandArgs: string[] = ['-d', '-u'],
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

  const args: readonly string[] = ['init', name, ...commandArgs]
  const options: Options<string> = { cwd: rootDir, stdio: 'inherit' }

  return run(args, options).then(() => ({
    dir: projectRoot,
    has,
    read,
    write,
    rm,
    clear,
  }))
}
