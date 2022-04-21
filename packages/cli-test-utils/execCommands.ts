import { spawnSync } from 'child_process'
import type { SpawnSyncReturns, SpawnSyncOptionsWithStringEncoding } from 'child_process'
import path from 'path'

export const CLI_PATH: string = path.resolve(__dirname, '../cli/bin/ori')
export const DEMO_PATH = '../temp'
export const SPAWN_OPTION: SpawnSyncOptionsWithStringEncoding = { encoding: 'utf-8', shell: process.platform === 'win32' }

export function runSync(
  args: readonly string[],
  options: SpawnSyncOptionsWithStringEncoding = SPAWN_OPTION,
): SpawnSyncReturns<string> {
  options = { ...options, ...SPAWN_OPTION }
  const commands = ['ts-node', CLI_PATH, ...args]
  const result = spawnSync('npx', commands, options)
  return result
}
