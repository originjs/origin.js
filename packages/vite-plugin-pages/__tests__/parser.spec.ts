import { getLayoutProperties } from '../src/parser'

describe('parsers', () => {
  const data = [
    { path: 'packages/vite-plugin-pages/__tests__/assets/pages/_.vue', layout: 'default' },
    { path: 'packages/vite-plugin-pages/__tests__/assets/pages/index.vue', layout: '' },
    { path: 'packages/vite-plugin-pages/__tests__/assets/pages/user/foo.vue', layout: '' },
    { path: 'packages/vite-plugin-pages/__tests__/assets/pages/user/_id.vue', layout: 'bar' },
  ]

  test('get layout config from pages file', () => {
    data.forEach(item => expect(getLayoutProperties(item.path)).toEqual(item.layout))
  })
})
