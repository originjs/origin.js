import { PluginOri } from '../Plugins'
const plugin = new PluginOri('vue-codemod')
export function codemod(args: string[]) {
  plugin.exec(getArgs(args))
}

export function codemodHelp() {
  plugin.exec(getHelp())
}

function getArgs(args: string[]): string[] {
  const toVue3Args = args.slice(3)
  return toVue3Args.length ? toVue3Args : ['-h']
}

function getHelp(): string[] {
  return ['-h']
}
