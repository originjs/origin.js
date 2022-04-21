import { runSync } from './execCommands'
import crossSpawn from 'cross-spawn'
import { SpawnSyncOptionsWithStringEncoding, SpawnSyncReturns } from 'child_process'

export default function buildTestProject(
  projectRoot: string,
): SpawnSyncReturns<string> {
  const args: readonly string[] = ['build']
  const options: SpawnSyncOptionsWithStringEncoding = { cwd: projectRoot, encoding: 'utf-8' }

  crossSpawn.sync('npm', ['install'], options)
  return runSync(args, options)
}
