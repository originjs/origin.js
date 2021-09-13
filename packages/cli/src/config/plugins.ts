export type PluginChoiceOption = {
    name: string
    package: string
    path?: string
    options?: string
}

const componentsPluginOptions = `{
      // allow auto load markdown components under \`./src/components/\`
      extensions: ['vue', 'md'],
      // allow typescript
      dts: true,
      // allow auto import and register components used in markdown
      include: [/\\.vue$/, /\\.vue\\?vue/, /\\.md$/],
    }`

export const assetsOption: PluginChoiceOption = {
    name: 'assets',
    package: '@originjs/vite-plugin-assets',
}

export const componentsOption: PluginChoiceOption = {
    name: 'Components',
    package: 'unplugin-vue-components',
    path: '/vite.d.ts',
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
