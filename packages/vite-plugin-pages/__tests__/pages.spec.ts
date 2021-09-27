import { initPages } from '../src/pages'

describe('pages', () => {
  const extensions = ['vue']
  const pagesDir = 'packages/vite-plugin-pages/__tests__/assets/pages'
  const winPagesDir = pagesDir.replace(/\//g, '\\')

  test('getPages', () => {
    expect(initPages(pagesDir, extensions).sortedPages).toMatchSnapshot()
    expect(initPages(winPagesDir, extensions).sortedPages).toMatchSnapshot()
  })
})
