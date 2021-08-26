import { getVueFiles } from '../src/files'

describe('files', () => {
  const pagesDir = 'packages/vite-plugin-pages/__tests__/assets/pages'
  const windowsPagesDir = pagesDir.replace(/\//g, '\\')

  test('get vue files', () => {
    expect(getVueFiles(pagesDir)).toMatchSnapshot()
    expect(getVueFiles(windowsPagesDir)).toMatchSnapshot()
  })
})
