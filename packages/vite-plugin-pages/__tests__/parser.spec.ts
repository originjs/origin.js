import { getLayoutProperties } from '../src/parser'

describe('parsers', () => {
  const pagesDir = 'packages/vite-plugin-pages/__tests__/assets/pages'
  const windowsPagesDir = pagesDir.replace(/\//g, '\\')

  test('get layout config from pages file', () => {
    expect(getLayoutProperties(pagesDir)).toMatchSnapshot()
    expect(getLayoutProperties(windowsPagesDir)).toMatchSnapshot()
  })
})
