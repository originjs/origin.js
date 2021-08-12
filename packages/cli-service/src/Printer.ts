import fse from 'fs-extra'
import type { InlineConfig } from 'vite'
import { baseConfig, buildConfig, serverConfig } from './config/base'
const requireEsm = require('esm')(module)
class Printer {
  name: string
  vueVersion: number
  rootDir: string
  css?: string[]
  typeScprict?: boolean
  test?: string[]
  eslint?: boolean
  localConfig?: InlineConfig

  constructor(dir: string) {
    const pkg = fse.readJsonSync(`${dir}/package.json`)
    this.rootDir = dir
    this.name = pkg.name
    this.vueVersion = 3
    this.loadConfig(this.rootDir)
  }
  getBaseSchema(): InlineConfig {
    baseConfig.root = this.rootDir
    return baseConfig
  }

  loadConfig(rootDir: string) {
    if (fse.pathExistsSync(`${rootDir}/vite.config.js`)) {
      this.localConfig = requireEsm(`${rootDir}/vite.config.js`).default
    } else if (fse.pathExistsSync(`${rootDir}/vite.config.ts`)) {
      this.localConfig = requireEsm(`${rootDir}/vite.config.ts`).default
    }
  }
}

class DevPrinter extends Printer {
  constructor(dir: string) {
    super(dir)
  }
  getSchema() {
    const base = this.getBaseSchema()
    const _configs: InlineConfig = Object.assign(
      base,
      serverConfig,
      this.localConfig,
    )
    _configs.mode = 'development'
    return _configs
  }
}

class BuildPrinter extends Printer {
  constructor(dir: string) {
    super(dir)
  }
  getSchema() {
    const base = this.getBaseSchema()
    const _configs: InlineConfig = Object.assign(
      base,
      buildConfig,
      this.localConfig,
    )
    _configs.mode = 'production'
    return _configs
  }
}
export { DevPrinter, BuildPrinter }
