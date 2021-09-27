import { generateRoutes } from '../src/generates'
import { PluginOptions } from '../src/types'
import { initPages } from '../src/pages'
import { initLayouts } from '../src/parser'

describe('generates', () => {
  test('generateRoutes', () => {
    const options: PluginOptions = {
      root: process.cwd(),
      pagesDir: 'packages/vite-plugin-pages/__tests__/assets/pages',
      layoutsDir: 'packages/vite-plugin-pages/__tests__/assets/layouts',
      extensions: ['vue'],
    }
    initPages(options.pagesDir, options.extensions)
    initLayouts(options.layoutsDir, options.extensions)
    expect(generateRoutes(options)).toMatchSnapshot()
  })
})
