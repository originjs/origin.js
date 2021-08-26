import { generateRoutes } from '../src/generates'
import { Page } from '../src/types'

describe('generates', () => {
  test('generateRoutes', () => {
    const pages: Page[] = [
      { pathFromPagesDir: '_.vue', pathFromRootDir: '/_.vue' },
      { pathFromPagesDir: 'index.vue', pathFromRootDir: '/index.vue' },
      { pathFromPagesDir: 'user/index.vue', pathFromRootDir: '/user/index.vue' },
      { pathFromPagesDir: 'user/foo.vue', pathFromRootDir: '/user/foo.vue' },
      {
        pathFromPagesDir: 'user/_id/index.vue',
        pathFromRootDir: '/user/_id/index.vue',
      },
      {
        pathFromPagesDir: 'user/_id/profile.vue',
        pathFromRootDir: '/user/_id/profile.vue',
      },
      {
        pathFromPagesDir: 'user/nest_user/foo.vue',
        pathFromRootDir: '/user/nest_user/foo.vue',
      },
    ]

    expect(generateRoutes(pages)).toMatchSnapshot()
  })
})
