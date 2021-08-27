import { PluginOptions } from './index'
import { createFilter } from '@rollup/pluginutils'
import xml2js from 'xml2js'
import toSource from 'tosource'

export default function xmlTransform(
  options: PluginOptions = {},
  code: string,
  id: string,
) {
  const filter = createFilter(options.xml!.include, options.xml!.exclude)
  if (!filter(id)) {
    return null
  }

  let generatedCode
  xml2js.parseString(
    code,
    options.xml!.xml2jsOptions!,
    function (error, result) {
      if (error === null) {
        generatedCode = `var data = ${toSource(result)};\nexport default data;`
      } else {
        throw error
      }
    },
  )

  return {
    code: generatedCode,
  }
}
