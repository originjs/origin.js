import path from 'path'
import execa, { Options } from 'execa'
import { CLI_PATH, DEMO_PATH } from './execCommands'

export default function buildTestProject(name: string) {
  const rootDir: string = path.resolve(__dirname, DEMO_PATH)
  const projectRoot: string = path.resolve(rootDir, name)

  const args: readonly string[] = ['build']
  const options: Options<string> = { cwd: projectRoot }

  return execa(`npx ts-node ${CLI_PATH}`, args, options)
}
