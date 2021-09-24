import { join } from 'path'
import { Page } from './types'
import { getFiles } from './files'
import { replaceWithSlash } from './utils'

/**
 * generate Page Object
 * @param pagesDir pages directory path
 * @param pathFromPagesDir page file path from pages directory path
 */
function getPage(pagesDir: string, pathFromPagesDir: string): Page {
  /**
   * normalize pathFromRootDir, use to check file path and sort
   * 1. make sure all path starts with /
   * 2. convert path like /_xx, /_$xx to /xx
   * 3. convert path like /_ to /~ (use for sort, because ASCII of ~ is 126)
   * @param str pathFromPagesDir
   */
  function normalized(str: string): string {
    if (!str.startsWith('/')) {
      str = `/${str}`
    }
    return str
      .replace('index.vue', '') // remove 'index.vue'
      .replace('_.vue', '~.vue') // '_.vue' => '~.vue'
      .replace(/\/_/g, '/') // '/_' => '/'
      .replace(/\/\$/g, '/') // '/$' => '/'
  }

  return {
    pathFromPagesDir: pathFromPagesDir,
    pathFromRootDir: replaceWithSlash(join(pagesDir, pathFromPagesDir)),
    pathFromPagesDirNormalized: normalized(pathFromPagesDir),
  }
}

/**
 * check with pathFromPagesDirNormalized, remove duplicated page and warn
 */
export function checkPages(pages: Page[]): Page[] {
  const set = new Set<string>()
  const res: Page[] = []
  pages.forEach(page => {
    if (!set.has(page.pathFromPagesDirNormalized)) {
      set.add(page.pathFromPagesDirNormalized)
      res.push(page)
    } else {
      console.log(
        `vite-plugin-pages warn: path of ${page.pathFromPagesDir} is Duplicated`,
      )
    }
  })
  return res
}

/**
 * sort pages by pathFromPagesDirNormalized:
 * in each directory: index.vue is the first, _.vue is the last
 */
export function sortPages(pages: Page[]): Page[] {
  pages.sort((a, b) => {
    const strA = a.pathFromPagesDirNormalized
    const strB = b.pathFromPagesDirNormalized
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
  const pages = checkPages(files.map(file => getPage(pagesDir, file)))
  return sortPages(pages)
}
