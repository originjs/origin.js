import { PluginOri } from '../Plugins'
const plugin = new PluginOri('vue-codemod')
export function codemod(args: string[]) {
  plugin.exec(getArgs(args))
}

export function codemodHelp() {
  plugin.exec(getHelp())
}

function getArgs(args: string[]): string[] {
  return args.slice(3)
}

function getHelp(): string[] {
  return ['-h']
}
