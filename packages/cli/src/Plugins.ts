import type { SpawnSyncOptionsWithStringEncoding } from 'child_process'
import { spawn } from 'child_process'

export class PluginOri {
  command: string
  args: string[]
  constructor(name: string) {
    this.command = 'npx'
    this.args = [`@originjs/${name}`]
  }

  exec(args: string[], options?: SpawnSyncOptionsWithStringEncoding) {
    const _options = Object.assign(
      {
        encoding: 'utf-8', 
        stdio: 'inherit',
        shell: process.platform === 'win32',
      },
      options,
    )
    if (args === null) {
      args = []
    }
    spawn(this.command, [...this.args, ...args], _options)
  }
}
