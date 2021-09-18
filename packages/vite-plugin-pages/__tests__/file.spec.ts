import { getFiles } from '../src/files'

describe('files', () => {
  const extensions = ['vue']
  const pagesDir = 'packages/vite-plugin-pages/__tests__/assets/pages'
  const winPagesDir = pagesDir.replace(/\//g, '\\')

  test('get vue files', () => {
    expect(getFiles(pagesDir, extensions).sort()).toMatchSnapshot()
    expect(getFiles(winPagesDir, extensions).sort()).toMatchSnapshot()
  })
})
