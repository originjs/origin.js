import { PluginOptions } from './index'
import { createFilter } from '@rollup/pluginutils'
import ini from 'ini'
import toSource from 'tosource'

export default function iniTransform(
  options: PluginOptions = {},
  code: string,
  id: string,
) {
  const filter = createFilter(options.ini!.include, options.ini!.exclude)
  if (!filter(id)) {
    return null
  }

  const iniData = ini.parse(code)
  const generatedCode = `var data = ${toSource(iniData)};\nexport default data;`

  return {
    code: generatedCode,
  }
}
