import { getVueFiles } from '../src/files'

describe('files', () => {
  const pagesDir = 'packages/vite-plugin-pages/__tests__/assets/pages'
  const windowsPagesDir = pagesDir.replace(/\//g, '\\')

  test('get vue files', () => {
    const expected = [
      'index.vue',
      'user/foo.vue',
      'user/nest_user/foo.vue',
    ]
    expect(getVueFiles(pagesDir)).toEqual(expected)
    expect(getVueFiles(windowsPagesDir)).toEqual(expected)
  })
})
