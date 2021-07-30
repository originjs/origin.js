const { spawn } = require('child_process')
const Path = require('path')

export interface PluginConfig {
  name: string
  options: string[]
  args: string[]
}

export class PluginOri {
  args: string[]
  command: string
  constructor(options: PluginConfig) {
    this.args = options.args
    this.command = Path.resolve(
      __dirname,
      `../node_modules/.bin/${options.name}`,
    )
  }

  exec() {
    spawn(this.command, this.args, {
      cwd: __dirname,
      stdio: 'inherit',
      shell: true,
    })
  }
}
