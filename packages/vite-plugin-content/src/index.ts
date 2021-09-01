import { Plugin } from 'vite'
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

export default (options: PluginOptions = {}): Plugin => {
  const opts: PluginOptions = Object.assign({}, DEFAULT_OPTIONS, options)

  const transforms: {
    [key: string]: any
  } = {}

  const loadTransform = function (key: string) {
    if (!!transforms[key]) {
      return transforms[key].default
    }

    switch (key) {
      case 'xml':
        transforms[key] = require('./xmlTransformation')
        break
      case 'yaml':
        transforms[key] = require('./yamlTransformation')
        break
      case 'csv':
        transforms[key] = require('./csvTransformation')
        break
      case 'ini':
        transforms[key] = require('./iniTransformation')
        break
      case 'properties':
        transforms[key] = require('./propertiesTransformation')
        break
      case 'toml':
        transforms[key] = require('./tomlTransformation')
        break
      case 'plist':
        transforms[key] = require('./plistTransformation')
        break
      case 'xlsx':
        transforms[key] = require('./xlsxTransformation')
        break
      default:
    }

    return transforms[key].default
  }

  return {
    name: 'vite:content',
    async transform(code: string, id: string) {
      if (opts.xml!.enabled && XML_EXTENSION.test(id)) {
        return loadTransform('xml')(opts, code, id)
      }

      if (opts.yaml!.enabled && YAML_EXTENSION.test(id)) {
        return loadTransform('yaml')(opts, code, id)
      }

      if (opts.csv!.enabled && CSV_EXTENSION.test(id)) {
        return loadTransform('csv')(opts, code, id)
      }

      if (opts.ini!.enabled && INI_EXTENSION.test(id)) {
        return loadTransform('ini')(opts, code, id)
      }

      if (opts.properties!.enabled && PROPERTIES_EXTENSION.test(id)) {
        return loadTransform('properties')(opts, code, id)
      }

      if (opts.toml!.enabled && TOML_EXTENSION.test(id)) {
        return loadTransform('toml')(opts, code, id)
      }

      if (opts.toml!.enabled && PLIST_EXTENSION.test(id)) {
        return loadTransform('plist')(opts, code, id)
      }

      if (opts.xlsx!.enabled && XLSX_EXTENSION.test(id)) {
        return loadTransform('xlsx')(opts, code, id)
      }
      return null
    },
  }
}
