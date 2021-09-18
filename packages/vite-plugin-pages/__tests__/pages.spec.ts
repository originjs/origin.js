import { getPages, sortPages } from '../src/pages'

describe('pages', () => {
  const extensions = ['vue']
  const pagesDir = 'packages/vite-plugin-pages/__tests__/assets/pages'
  const winPagesDir = pagesDir.replace(/\//g, '\\')

  test('getPages', () => {
    expect(sortPages(getPages(pagesDir, extensions))).toMatchSnapshot()
    expect(sortPages(getPages(winPagesDir, extensions))).toMatchSnapshot()
  })
})
