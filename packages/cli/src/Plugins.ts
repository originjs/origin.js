import type { SpawnOptionsWithoutStdio } from 'child_process'
import { spawn } from 'child_process'

export class PluginOri {
  command: string
  constructor(name: string) {
    this.command = `npx @originjs/${name}`
  }

  exec(args: string[], options?: SpawnOptionsWithoutStdio) {
    const _options = Object.assign(
      {
        stdio: 'inherit',
        shell: process.platform === 'win32',
      },
      options,
    )
    return spawn(this.command, args, _options)
  }
}
