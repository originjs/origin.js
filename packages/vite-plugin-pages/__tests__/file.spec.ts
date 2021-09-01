import { getFiles, sortFilePaths } from '../src/files'

describe('files', () => {
  const extensions = ['vue']
  const pagesDir = 'packages/vite-plugin-pages/__tests__/assets/pages'
  const winPagesDir = pagesDir.replace(/\//g, '\\')

  test('get vue files', () => {
    expect(sortFilePaths(getFiles(pagesDir, extensions))).toMatchSnapshot()
    expect(sortFilePaths(getFiles(winPagesDir, extensions))).toMatchSnapshot()
  })
})
