import { getVueFiles } from '../src/files'


describe('files', () => {
  const pagesDir = 'packages/vite-plugin-pages/__tests__/assets/pages'

  test('get vue files', () => {
    const files = getVueFiles(pagesDir)
    expect(files).toEqual(['user/foo.vue'])
  })
})

