import { PluginOri } from '../Plugins'
const plugin = new PluginOri('webpack-to-vite')
export function toVite(args: string[]) {
  plugin.exec(getArgs(args))
}

export function toViteHelp() {
  plugin.exec(getHelp())
}

function getArgs(args: string[]): string[] {
  return args.slice(3)
}

function getHelp(): string[] {
  return ['-h']
}
