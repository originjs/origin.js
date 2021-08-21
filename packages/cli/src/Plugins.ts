import { spawn } from 'child_process'
import type { SpawnOptionsWithoutStdio } from 'child_process'
import Path from 'path'
export class PluginOri {
  command: string
  constructor(name: string) {
    this.command = Path.resolve(__dirname, `../../node_modules/.bin/${name}`)
  }

  exec(args: string[], options?: SpawnOptionsWithoutStdio) {
    const _options = Object.assign(
      {
        stdio: 'inherit',
        shell: true,
      },
      options,
    )
    return spawn(this.command, args, _options)
  }
}
