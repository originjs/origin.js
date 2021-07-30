import type { PluginConfig } from '../Plugins'
import { PluginOri } from '../Plugins'
export function codemod(name: string, options?: any) {
  const _option: PluginConfig = {
    name: 'vue-codemod',
    options: [],
    args: getArgs(name, options),
  }

  const plugin = new PluginOri(_option)
  plugin.exec()
}

export function getArgs(name: string, options: any = {}): string[] {
  const args = [name]
  const { transformation, runAllTransformation, params, reportFormatter } =
    options

  if (transformation) {
    args.push('-t')
    args.push(transformation)
  }
  if (runAllTransformation) {
    args.push('-a')
  }
  if (params) {
    args.push('-p')
    args.push(params)
  }
  if (reportFormatter) {
    args.push('-f')
    args.push(reportFormatter)
  }
  return args
}
