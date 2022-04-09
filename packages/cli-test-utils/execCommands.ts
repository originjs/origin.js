import { command, Options, ExecaChildProcess } from 'execa'
import path from 'path'

export const CLI_PATH: string = path.resolve(__dirname, '../cli/bin/ori')
export const DEMO_PATH = '../temp'

export default function run(
  args: readonly string[],
  options: Options<string> = {},
): ExecaChildProcess<string> {
  return command(`npx ts-node ${CLI_PATH} ${args.join(' ')}`, options)
}
