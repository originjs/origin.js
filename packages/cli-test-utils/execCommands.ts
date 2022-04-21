import { SpawnSyncReturns, SpawnSyncOptionsWithStringEncoding } from 'child_process'
import crossSpawn from 'cross-spawn'
import path from 'path'

export const CLI_PATH: string = path.resolve(__dirname, '../cli/bin/ori')
export const DEMO_PATH = '../temp'

export function runSync(
  args: readonly string[],
  options: SpawnSyncOptionsWithStringEncoding = { encoding: 'utf-8' },
): SpawnSyncReturns<string> {
  options.encoding = 'utf-8'
  const commands = ['ts-node', CLI_PATH, ...args]
  const result = crossSpawn.sync('npx', commands, options)
  return result
}
