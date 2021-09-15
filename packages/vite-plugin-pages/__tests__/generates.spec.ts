import { generateRoutes } from '../src/generates'
import { Page, PluginOptions } from '../src/types'
import { getPages } from '../src/pages'

describe('generates', () => {
  test('generateRoutes', () => {
    const options: PluginOptions = {
      root: process.cwd(),
      pagesDir: 'packages/vite-plugin-pages/__tests__/assets/pages',
      layoutsDir: 'packages/vite-plugin-pages/__tests__/assets/layouts',
      extensions: ['vue'],
    }
    const pages: Page[] = getPages(options.pagesDir, options.extensions)
    expect(generateRoutes(pages, options)).toMatchSnapshot()
  })
})
