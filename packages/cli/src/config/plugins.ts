export type PluginChoiceOption = {
  name: string
  package: string
  version: string
  path?: string
  options?: string
}

const indentLength = 6
const indent: string = ' '.repeat(indentLength)
const indentEnd: string = ' '.repeat(indentLength - 2)

const componentsPluginOptions = `{
${indent}// allow auto load markdown components under \`./src/components/\`
${indent}extensions: ['vue', 'md'],
${indent}// allow typescript
${indent}dts: true,
${indent}// allow auto import and register components used in markdown
${indent}include: [/\\.vue$/, /\\.vue\\?vue/, /\\.md$/],
${indentEnd}}`

export const globalStyleOption: PluginChoiceOption = {
  name: 'globalStyle',
  package: '@originjs/vite-plugin-global-style',
  version: '^1.0.2',
}

export const componentsOption: PluginChoiceOption = {
  name: 'components',
  package: 'unplugin-vue-components',
  path: '/vite',
  options: componentsPluginOptions,
  version: '^0.17.9',
}

export const contentOption: PluginChoiceOption = {
  name: 'content',
  package: '@originjs/vite-plugin-content',
  version: '^1.0.1',
}

export const pagesOption: PluginChoiceOption = {
  name: 'pages',
  package: '@originjs/vite-plugin-pages',
  version: '^1.0.1-beta.2',
}

export const markdownOption: PluginChoiceOption = {
  name: 'markdown',
  package: 'vite-plugin-md',
  version: '^0.11.6',
}

export const federationOption: PluginChoiceOption = {
  name: 'federation',
  package: '@originjs/vite-plugin-federation',
  version: '^1.0.0',
}
