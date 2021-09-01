import { PluginOptions } from './index'
import { createFilter } from '@rollup/pluginutils'
import toml from '@iarna/toml'
import toSource from 'tosource'

export default function tomlTransform(
  options: PluginOptions = {},
  code: string,
  id: string,
) {
  const filter = createFilter(options.toml!.include, options.toml!.exclude)
  if (!filter(id)) {
    return null
  }

  const tomlData = toml.parse(code)
  const generatedCode = `var data = ${toSource(
    tomlData,
  )};\nexport default data;`

  return {
    code: generatedCode,
  }
}
