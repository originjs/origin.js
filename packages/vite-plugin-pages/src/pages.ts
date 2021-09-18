import { join } from 'path'
import { Page } from './types'
import { getFiles } from './files'
import { replaceWithSlash } from './utils'

function getPage(pathFromPagesDir: string, pathFromRootDir: string): Page {
  return {
    pathFromPagesDir,
    pathFromRootDir,
  }
}

/**
 * sort pages by pathFromPagesDir:
 * 1. treat xx, _xx, _$xx as same name
 * 2. in each directory: index.vue is the first, _.vue is the last
 */
export function sortPages(pages: Page[]): Page[] {
  function normalStr(str: string): string {
    if (!str.startsWith('/')) {
      str = `/${str}`
    }
    return str
      .replace('index.vue', '') // remove 'index.vue'
      .replace('_.vue', '~.vue') // '_.vue' => '~.vue'
      .replace(/\/_/g, '/') // '/_' => '/'
      .replace(/\/\$/g, '/') // '/$' => '/'
  }

  pages.sort((a, b) => {
    const strA = normalStr(a.pathFromPagesDir)
    const strB = normalStr(b.pathFromPagesDir)
    if (strA < strB) {
      return -1
    }
    if (strA > strB) {
      return 1
    }
    return 0
  })
  return pages
}

export function getPages(pagesDir: string, extensions: string[]): Page[] {
  const files = getFiles(pagesDir, extensions)
  return sortPages(
    files.map(file => getPage(file, replaceWithSlash(join(pagesDir, file)))),
  )
}
