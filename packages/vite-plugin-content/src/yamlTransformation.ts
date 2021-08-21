import YAML from 'js-yaml'
import { PluginOptions } from './index'
import { createFilter } from '@rollup/pluginutils'
import toSource from 'tosource'

export default function yamlTransform(
  options: PluginOptions = {},
  code: string,
  id: string,
): any {
  const filter = createFilter(options.yaml!.include, options.yaml!.exclude)
  if (!filter(id)) {
    return null
  }

  let yamlData: any | any[]
  if (options.yaml!.loadMultiDocument) {
    yamlData = YAML.loadAll(code)
  } else {
    yamlData = YAML.load(code)
  }

  const generatedCode = `var data = ${toSource(
    yamlData,
  )};\nexport default data;`

  return {
    code: generatedCode,
  }
}
