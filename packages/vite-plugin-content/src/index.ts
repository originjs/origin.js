import { Plugin } from 'vite'
import yamlTransform from './yamlTransformation'
import { FilterPattern } from '@rollup/pluginutils'
import xmlTransform from './xmlTransformation'
import { ParserOptions } from 'xml2js'
import { Options as CSVOptions } from 'csv-parse'
import csvTransform from './csvTransformation'

export type PluginOptions = {
  xml?: {
    enabled?: boolean,
    include?: FilterPattern,
    exclude?: FilterPattern,
    xml2jsOptions?: ParserOptions
  },
  yaml?: {
    enabled?: boolean,
    include?: FilterPattern,
    exclude?: FilterPattern,
    loadMultiDocument?: boolean
  },
  csv?: {
    enabled?: boolean,
    include?: FilterPattern,
    exclude?: FilterPattern,
    csvOptions?: CSVOptions
  },
  markdown?: {
    enabled?: boolean,
    include?: FilterPattern,
    exclude?: FilterPattern
  },
}

const DEFAULT_OPTIONS: PluginOptions = {
  xml: {
    enabled: true,
  },
  yaml: {
    enabled: true,
    loadMultiDocument: false,
  },
  csv: {
    enabled: true,
  },
  markdown: {
    enabled: true,
  },
}

const XML_EXTENSION = /\.xml$/;
const YAML_EXTENSION = /\.ya?ml$/;
const CSV_EXTENSION = /\.csv$/;

export default (options: PluginOptions = {}): Plugin => {
  const opts: PluginOptions = Object.assign({}, DEFAULT_OPTIONS, options);

  return {
    name: 'vite:content',
    async transform(code: string, id: string) {
      if (opts.xml!.enabled && XML_EXTENSION.test(id)) {
        return xmlTransform(opts, code, id)
      }

      if (opts.yaml!.enabled && YAML_EXTENSION.test(id)) {
        return yamlTransform(opts, code, id)
      }

      if (opts.csv!.enabled && CSV_EXTENSION.test(id)) {
        return csvTransform(opts, code, id)
      }
      return null
    },
  }
}
