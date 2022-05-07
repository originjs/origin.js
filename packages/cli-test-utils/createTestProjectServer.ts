import { runSync } from './execCommands'
import { spawnSync } from 'child_process'
import type { SpawnSyncOptionsWithStringEncoding, SpawnSyncReturns } from 'child_process'
import { SPAWN_OPTION } from './execCommands'

export function createTestProjectServer(
  projectRoot: string,
): SpawnSyncReturns<string> {
  const args: readonly string[] = ['dev', '-n', '-c']
  const options: SpawnSyncOptionsWithStringEncoding = { cwd: projectRoot, ...SPAWN_OPTION }

  spawnSync('npm', ['install'], options)
  return runSync(args, options)
}
