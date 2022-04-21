import crossSpawn from 'cross-spawn'
import type { SpawnOptionsWithoutStdio } from 'child_process'
export class PluginOri {
  command: string
  constructor(name: string) {
    this.command = `npx @originjs/${name}`
  }

  exec(args: string[], options?: SpawnOptionsWithoutStdio) {
    const _options = Object.assign(
      {
        stdio: 'inherit',
        shell: true,
      },
      options,
    )
    return crossSpawn(this.command, args, _options)
  }
}
