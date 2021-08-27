import { PluginOptions } from './index'
import { createFilter } from '@rollup/pluginutils'
import plist from 'plist'
import toSource from 'tosource'

export default function plistTransform(
  options: PluginOptions = {},
  code: string,
  id: string,
) {
  const filter = createFilter(options.plist!.include, options.plist!.exclude)
  if (!filter(id)) {
    return null
  }

  const iniData = plist.parse(code)
  const generatedCode = `var data = ${toSource(iniData)};\nexport default data;`

  return {
    code: generatedCode,
  }
}
