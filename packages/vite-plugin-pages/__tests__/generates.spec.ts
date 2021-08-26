import { generateRoutes } from '../src/generates'
import { Page } from '../src/types'

describe('generates', () => {
  test('generateRoutes', () => {
    const pages: Page[] = [
      { pathFromPagesDir: '_.vue', pathFromRootDir: 'packages/vite-plugin-pages/__tests__/assets/pages/_.vue' },
      { pathFromPagesDir: 'index.vue', pathFromRootDir: 'packages/vite-plugin-pages/__tests__/assets/pages/index.vue' },
      { pathFromPagesDir: 'user/index.vue', pathFromRootDir: 'packages/vite-plugin-pages/__tests__/assets/pages/user/index.vue' },
      { pathFromPagesDir: 'user/foo.vue', pathFromRootDir: 'packages/vite-plugin-pages/__tests__/assets/pages/user/foo.vue' },
      {
        pathFromPagesDir: 'user/_id.vue',
        pathFromRootDir: 'packages/vite-plugin-pages/__tests__/assets/pages/user/_id.vue',
      },
      {
        pathFromPagesDir: 'user/nest_user/foo.vue',
        pathFromRootDir: 'packages/vite-plugin-pages/__tests__/assets/pages/user/nest_user/foo.vue',
      },
    ]

    expect(generateRoutes(pages)).toMatchSnapshot()
  })
})
