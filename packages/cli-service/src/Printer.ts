import fse from 'fs-extra'
import type { ConfigEnv, InlineConfig } from 'vite'
import { loadConfigFromFile } from 'vite'
import { baseConfig, buildConfig, serverConfig } from './config/base'

class Printer {
  name: string
  vueVersion: number
  rootDir: string
  css?: string[]
  typeScprict?: boolean
  test?: string[]
  eslint?: boolean
  configFile?: string

  constructor(dir: string) {
    const pkg = fse.readJsonSync(`${dir}/package.json`)
    this.rootDir = dir
    this.name = pkg.name
    this.vueVersion = 3
    this.loadConfig(this.rootDir)
  }
  getBaseSchema(): InlineConfig {
    baseConfig.root = this.rootDir
    // For baseConfig, no distortion
    return JSON.parse(JSON.stringify(baseConfig))
  }

  loadConfig(rootDir: string) {
    if (fse.pathExistsSync(`${rootDir}/vite.config.js`)) {
      this.configFile = `${rootDir}/vite.config.js`
    } else if (fse.pathExistsSync(`${rootDir}/vite.config.ts`)) {
      this.configFile = `${rootDir}/vite.config.ts`
    }
  }
}

class DevPrinter extends Printer {
  constructor(dir: string) {
    super(dir)
  }
  async getSchema() {
    const base: InlineConfig = this.getBaseSchema()
    const MODE = 'development'
    const configEnv: ConfigEnv = {
      mode: MODE,
      command: 'serve',
    }
    const localConfig = await loadConfigFromFile(configEnv, this.configFile, this.rootDir)
    const _configs: InlineConfig = Object.assign(
      base,
      serverConfig,
      localConfig?.config,
    )
    _configs.mode = MODE
    return _configs
  }
}

class BuildPrinter extends Printer {
  constructor(dir: string) {
    super(dir)
  }
  async getSchema() {
    const base: InlineConfig = this.getBaseSchema()
    const MODE = 'production'
    const configEnv: ConfigEnv = {
      mode: MODE,
      command: 'build',
    }
    const localConfig = await loadConfigFromFile(configEnv, this.configFile, this.rootDir)
    const _configs: InlineConfig = Object.assign(
      base,
      buildConfig,
      localConfig?.config,
    )
    _configs.mode = MODE
    return _configs
  }
}
export { DevPrinter, BuildPrinter }
