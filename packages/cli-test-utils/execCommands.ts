import { commandSync, ExecaSyncReturnValue, SyncOptions } from 'execa'
import path from 'path'

export const CLI_PATH: string = path.resolve(__dirname, '../cli/bin/ori')
export const DEMO_PATH = './test_projects'

export default function run(
  args: string[],
  options: SyncOptions<string> = {},
): ExecaSyncReturnValue<string> {
  return commandSync(`npx ts-node ${CLI_PATH} ${args.join(' ')}`, options)
}
