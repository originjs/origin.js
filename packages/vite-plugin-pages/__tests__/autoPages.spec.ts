import { generateRoutes } from '../src/generates'
import { getPages } from '../src/pages'

describe('auto pages', () => {
  const extensions = ['vue']
  const pagesDir = 'packages/vite-plugin-pages/__tests__/assets/pages'
  const layoutsDir = 'packages/vite-plugin-pages/__tests__/assets/layouts'

  test('auto pages router', () => {
    const pages = getPages(pagesDir, extensions)
    const routes = generateRoutes(pages, {
      root: process.cwd(),
      pagesDir: pagesDir,
      layoutsDir: layoutsDir,
      extensions: ['vue'],
    })
    expect(routes).toMatchSnapshot()
  })
})
