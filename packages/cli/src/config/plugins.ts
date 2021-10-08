export type PluginChoiceOption = {
  name: string
  package: string
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
}

export const componentsOption: PluginChoiceOption = {
  name: 'components',
  package: 'unplugin-vue-components',
  path: '/vite',
  options: componentsPluginOptions,
}

export const contentOption: PluginChoiceOption = {
  name: 'content',
  package: '@originjs/vite-plugin-content',
}

export const pagesOption: PluginChoiceOption = {
  name: 'pages',
  package: '@originjs/vite-plugin-pages',
}
