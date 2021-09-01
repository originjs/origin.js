import { getLayoutProperties } from '../src/parser'

describe('parsers', () => {
  const pagesDir = 'packages/vite-plugin-pages/__tests__/assets/pages'
  const data = [
    { path: `${pagesDir}/_.vue`, layout: 'default' },
    { path: `${pagesDir}/index.vue`, layout: '' },
    { path: `${pagesDir}/user/foo.vue`, layout: '' },
    { path: `${pagesDir}/user/_id.vue`, layout: 'bar' },
  ]

  test('get layout config from pages file', () => {
    data.forEach(item =>
      expect(getLayoutProperties(item.path)).toEqual(item.layout),
    )
  })
})
