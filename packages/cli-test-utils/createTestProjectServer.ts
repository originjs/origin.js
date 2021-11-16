import path from 'path'
import { Options, command } from 'execa'
import run, { DEMO_PATH } from './execCommands'
import { ExecaChildProcess } from 'execa'

export default async function createTestProjectServer(
  name: string,
): Promise<ExecaChildProcess> {
  const rootDir: string = path.join(__dirname, DEMO_PATH)
  const projectRoot: string = path.join(rootDir, name)

  const args: readonly string[] = ['dev','-n','-c']
  const options: Options<string> = { cwd: projectRoot }

  await command('npm install', options)
  return run(args, options)
}
