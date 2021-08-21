import { PluginOptions } from './index'
import { createFilter } from '@rollup/pluginutils'
// @ts-ignore
import propertiesParser from 'properties-parser'
import toSource from 'tosource'

export default async function propertiesTransform(
  options: PluginOptions = {},
  code: string,
  id: string,
) {
  const filter = createFilter(options.ini!.include, options.ini!.exclude)
  if (!filter(id)) {
    return null
  }

  const propertiesData = propertiesParser.parse(code)
  const generatedCode = `var data = ${toSource(
    propertiesData,
  )};\nexport default data;`

  return generatedCode
}
