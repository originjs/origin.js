import { PluginOptions } from './index'
import { createFilter } from '@rollup/pluginutils'

import parseCSV from 'csv-parse/lib/sync'
import toSource from 'tosource'

export default function csvTransform(
  options: PluginOptions = {},
  code: string,
  id: string,
): any {
  const filter = createFilter(options.csv!.include, options.csv!.exclude)
  if (!filter(id)) {
    return null
  }

  const csvData = parseCSV(code, options.csv!.csvOptions)
  const generatedCode = `var data = ${toSource(csvData)};\nexport default data;`

  return {
    code: generatedCode,
  }
}
