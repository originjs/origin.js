const mainWithPagesPlugin = `import routes from 'virtual:plugin-pages'`

const mainImportContentComponents = `import Profile from './layouts/profile.vue'
import Content from './pages/content.vue'`
const mainWithContentPlugin = `{
    path: '/',
    component: Profile,
    children: [
      { path: '/content', component: Content }
    ]
`

const mainImportMarkdownComponents = `import Markdown from './pages/markdown.vue`
const mainWithMarkdownPlugin = `{ path: '/markdown', component: Markdown }`

const indexWithPagesPluginLogin = `<div><router-link class="text-router-link" to="/login">{{ $t("userLogin") }}</router-link></div>`
const indexWithPagesPluginChild = `<div><router-link class="text-router-link" to="/child">{{ $t("nestedRoutes") }}</router-link></div>`

const indexWithContentPlugin = `<div><router-link class="text-router-link" to="/content">{{ $t("content") }}</router-link></div>`

const indexWithMarkdownPlugin = `<div><router-link class="text-router-link" to="/markdown">{{ $t("markdown") }}</router-link></div>`

const viteConfigImportPagesPlugin = `import pages from '@originjs/vite-plugin-pages'`
const viteConfigWithPagesPlugin = `pages()`

const viteConfigImportContentPlugin = `import content from '@originjs/vite-plugin-content'`
const viteConfigWithContentPlugin = `content()`

const viteConfigImportMarkdownPlugin = `import markdown from 'vite-plugin-md'`
const viteConfigWithMarkdownPlugin = `markdown()`
const viteConfigWithMarkdownPluginVue = `vue({
      include: [/\\.vue$/, /\\.md$/],
    })`

const viteConfigImportGlobalStylePlugin = `import globalStyle from '@originjs/vite-plugin-global-style'`
const viteConfigWithGlobalStylePlugin = `globalStyle()`

const viteConfigImportComponentsPlugin = `import components from 'unplugin-vue-components/vite'`
const viteConfigWithComponentsPlugin = `components({
      // allow auto load markdown components under \`./src/components/\`
      extensions: ['vue', 'md'],
      // allow typescript
      dts: true,
      // allow auto import and register components used in markdown
      include: [/\\.vue$/, /\\.vue\\?vue/, /\\.md$/],
    })`

const packageJsonWithPagesPlugin = `@originjs/vite-plugin-pages":"latest"`
const packageJsonWithContentPlugin = `@originjs/vite-plugin-content":"latest"`
const packageJsonWithMarkdownPlugin = `vite-plugin-md":"latest"`
const packageJsonWithGlobalStylePlugin = `@originjs/vite-plugin-global-style":"latest"`
const packageJsonWithComponentsPlugin = `unplugin-vue-components":"latest"`

const appFileWithoutGlobalStylePlugin = `<style src="./assets/global-theme.css"></style>`

const defaultLayoutImportWithoutComponentsPlugin = `import Sources from '../components/Sources.vue'`
const defaultLayoutScriptWithoutComponentsPlugin = `components: {
    Sources
  }`

const packageJsonScriptWithJest = `"test": "jest"`
const packageJsonScriptWithVitest = `"test": "vitest --coverage"`

const viteConfigWithVitest = `test: {
  environment: 'jsdom',
  global: true
}`

const serverRunning = `dev server running at:`
const serverUpdated = `hmr update /src/App.vue`

export default {
  mainWithPagesPlugin,
  mainImportMarkdownComponents,
  mainWithMarkdownPlugin,
  mainImportContentComponents,
  mainWithContentPlugin,
  indexWithPagesPluginLogin,
  indexWithPagesPluginChild,
  indexWithContentPlugin,
  indexWithMarkdownPlugin,
  viteConfigImportComponentsPlugin,
  viteConfigImportContentPlugin,
  viteConfigImportGlobalStylePlugin,
  viteConfigImportMarkdownPlugin,
  viteConfigImportPagesPlugin,
  viteConfigWithComponentsPlugin,
  viteConfigWithContentPlugin,
  viteConfigWithGlobalStylePlugin,
  viteConfigWithMarkdownPlugin,
  viteConfigWithMarkdownPluginVue,
  viteConfigWithPagesPlugin,
  packageJsonWithComponentsPlugin,
  packageJsonWithContentPlugin,
  packageJsonWithGlobalStylePlugin,
  packageJsonWithMarkdownPlugin,
  packageJsonWithPagesPlugin,
  appFileWithoutGlobalStylePlugin,
  defaultLayoutImportWithoutComponentsPlugin,
  defaultLayoutScriptWithoutComponentsPlugin,
  packageJsonScriptWithJest,
  packageJsonScriptWithVitest,
  viteConfigWithVitest,
  serverRunning,
  serverUpdated,
}
