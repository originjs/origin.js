import fs from 'fs-extra'
import path from 'path'
import { DEMO_PATH } from './execCommands'
import { command, Options } from 'execa'

type TestProject = {
  dir: string
  has: (file: string) => boolean
  read: (file: string) => string
  write: (file: string, content: any) => Promise<void>
  rm: (file: string) => void
  clear: () => Promise<void>
}

export default async function createTestProjectVue2(
  name: string,
  commandArgs: string[] = ['-d', '-n', '-f', '-b', '--skipGetStarted'],
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

  const options: Options<string> = { cwd: rootDir, stdio: 'inherit' }

  return command(`vue create ${commandArgs.join(' ')} ${name}`, options).then(
    () => ({
      dir: projectRoot,
      has,
      read,
      write,
      rm,
      clear,
    }),
  )
}
