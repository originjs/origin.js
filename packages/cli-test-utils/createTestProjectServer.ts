import path from 'path'
import { Options } from 'execa'
import run, { DEMO_PATH } from './execCommands'
import { ExecaChildProcess } from 'execa'

export default function createTestProjectServer(
  name: string,
): ExecaChildProcess {
  const rootDir: string = path.join(__dirname, DEMO_PATH)
  const projectRoot: string = path.join(rootDir, name)

  const args: readonly string[] = ['dev']
  const options: Options<string> = { cwd: projectRoot }

  return run(args, options)
}
