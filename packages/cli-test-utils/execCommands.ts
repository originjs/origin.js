import {
  commandSync,
  command,
  Options,
  SyncOptions,
  ExecaSyncReturnValue,
  ExecaChildProcess,
} from 'execa'
import path from 'path'

export const CLI_PATH: string = path.resolve(__dirname, '../cli/bin/ori')
export const DEMO_PATH = '../temp'

export function run(
  args: readonly string[],
  options: Options<string> = {},
): ExecaChildProcess<string> {
  return command(`npx ts-node ${CLI_PATH} ${args.join(' ')}`, options)
}

export function runSync(
  args: readonly string[],
  options: SyncOptions<string> = {},
): ExecaSyncReturnValue<string> {
  return commandSync(`npx ts-node ${CLI_PATH} ${args.join(' ')}`, options)
}
