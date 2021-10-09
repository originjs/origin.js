import {
  globalStyleOption,
  componentsOption,
  contentOption,
  pagesOption,
  markdownOption,
  PluginChoiceOption,
} from '../cli/src/config/plugins'

const defaultOptions: any = {
  name: '',
  version: '1.0.0',
  license: 'ISC',
  plugins: [],
  pagesPluginImported: false,
  globalStylePluginImported: false,
  componentsPluginImported: false,
  contentPluginImported: false,
  markdownPluginImported: false,
}

const TO_BE_ADDED_PLUGINS: PluginChoiceOption[] = [
  globalStyleOption,
  componentsOption,
  contentOption,
  pagesOption,
  markdownOption,
]

function getPluginCompositions(): Array<PluginChoiceOption[]> {
  let compositions: Array<PluginChoiceOption[]> = []
  TO_BE_ADDED_PLUGINS.forEach(pluginOption => {
    compositions = [...compositions, ...compositions.map(c => [...c, pluginOption]), [pluginOption]]
  })
  return compositions
}

export function getConfigs(): any[] {
  const pluginCompositions: Array<PluginChoiceOption[]> = getPluginCompositions()
  const resultConfigs: any[] = []
  pluginCompositions.forEach((composition, index) => {
    const config: any = defaultOptions
    config.name = `testPlugins_${index + 1}`
    config.plugins = composition
    config.plugins.forEach((plugin: PluginChoiceOption) => {
      const pluginState = `${plugin.name}PluginImported`
      defaultOptions[pluginState] = true
    })
    resultConfigs.push(config)
  })
  return resultConfigs
}
