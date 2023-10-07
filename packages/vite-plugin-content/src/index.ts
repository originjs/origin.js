import { FilterPattern } from '@rollup/pluginutils'
import { ParserOptions } from 'xml2js'
import { Options as CSVOptions } from 'csv-parse'
import { ParsingOptions } from 'xlsx'

export type PluginOptions = {
  xml?: {
    enabled?: boolean
    include?: FilterPattern
    exclude?: FilterPattern
    xml2jsOptions?: ParserOptions
  }
  yaml?: {
    enabled?: boolean
    include?: FilterPattern
    exclude?: FilterPattern
    loadMultiDocument?: boolean
  }
  csv?: {
    enabled?: boolean
    include?: FilterPattern
    exclude?: FilterPattern
    csvOptions?: CSVOptions
  }
  ini?: {
    enabled?: boolean
    include?: FilterPattern
    exclude?: FilterPattern
  }
  properties?: {
    enabled?: boolean
    include?: FilterPattern
    exclude?: FilterPattern
  }
  toml?: {
    enabled?: boolean
    include?: FilterPattern
    exclude?: FilterPattern
  }
  plist?: {
    enabled?: boolean
    include?: FilterPattern
    exclude?: FilterPattern
  }
  xlsx?: {
    enabled?: boolean
    include?: FilterPattern
    exclude?: FilterPattern
    xlsxOptions?: ParsingOptions
  }
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
  ini: {
    enabled: true,
  },
  properties: {
    enabled: true,
  },
  toml: {
    enabled: true,
  },
  plist: {
    enabled: true,
  },
  xlsx: {
    enabled: true,
  },
}

const XML_EXTENSION = /\.xml$/
const YAML_EXTENSION = /\.ya?ml$/
const CSV_EXTENSION = /\.csv$/
const INI_EXTENSION = /\.ini$/
const PROPERTIES_EXTENSION = /\.properties$/
const TOML_EXTENSION = /\.toml$/
const PLIST_EXTENSION = /\.plist$/
const XLSX_EXTENSION = /\.xlsx?$/

type SupportedTransforms =
  | 'xml'
  | 'yaml'
  | 'csv'
  | 'ini'
  | 'properties'
  | 'toml'
  | 'plist'
  | 'xlsx'

export default (options: PluginOptions = {}) => {
  const opts: PluginOptions = Object.assign({}, DEFAULT_OPTIONS, options)

  const transforms: {
    [key in SupportedTransforms]?: any
  } = {}
  async function loadTransform(type: SupportedTransforms) {
    transforms[type] = (await import(`./${type}Transformation.js`)).default
  }

  return {
    name: 'vite:content',
    async transform(code: string, id: string) {
      let transformType: SupportedTransforms
      if (opts.xml!.enabled && XML_EXTENSION.test(id)) {
        transformType = 'xml'
      } else if (opts.yaml!.enabled && YAML_EXTENSION.test(id)) {
        transformType = 'yaml'
      } else if (opts.csv!.enabled && CSV_EXTENSION.test(id)) {
        transformType = 'csv'
      } else if (opts.ini!.enabled && INI_EXTENSION.test(id)) {
        transformType = 'ini'
      } else if (opts.properties!.enabled && PROPERTIES_EXTENSION.test(id)) {
        transformType = 'properties'
      } else if (opts.toml!.enabled && TOML_EXTENSION.test(id)) {
        transformType = 'toml'
      } else if (opts.toml!.enabled && PLIST_EXTENSION.test(id)) {
        transformType = 'plist'
      } else if (opts.xlsx!.enabled && XLSX_EXTENSION.test(id)) {
        transformType = 'xlsx'
      } else {
        return null
      }

      if (typeof transforms[transformType] === 'undefined') {
        await loadTransform(transformType)
      }
      return transforms[transformType](opts, code, id)
    },
  }
}
