import { getPages } from '../src/pages'

describe('pages', () => {
  const pagesDir = 'packages/vite-plugin-pages/__tests__/assets/pages'
  const windowsPagesDir = pagesDir.replace(/\//g, '\\')

  test('getPages', () => {
    const expected = [
      {
        pathFromPagesDir: 'index.vue',
        pathFromRootDir: 'packages/vite-plugin-pages/__tests__/assets/pages/index.vue',
      },
      {
        pathFromPagesDir: 'user/foo.vue',
        pathFromRootDir: 'packages/vite-plugin-pages/__tests__/assets/pages/user/foo.vue',
      },
      {
        pathFromPagesDir: 'user/nest_user/foo.vue',
        pathFromRootDir: 'packages/vite-plugin-pages/__tests__/assets/pages/user/nest_user/foo.vue',
      },
    ]
    expect(getPages(pagesDir)).toEqual(expected)
    expect(getPages(windowsPagesDir)).toEqual(expected)
  })
})
