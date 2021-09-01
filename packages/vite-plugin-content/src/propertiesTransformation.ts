import { PluginOptions } from './index'
import { createFilter } from '@rollup/pluginutils'
// @ts-ignore
import propertiesParser from 'properties-parser'
import toSource from 'tosource'

export default function propertiesTransform(
  options: PluginOptions = {},
  code: string,
  id: string,
) {
  const filter = createFilter(
    options.properties!.include,
    options.properties!.exclude,
  )
  if (!filter(id)) {
    return null
  }

  const propertiesData = propertiesParser.parse(code)
  const generatedCode = `var data = ${toSource(
    propertiesData,
  )};\nexport default data;`

  return {
    code: generatedCode,
  }
}
