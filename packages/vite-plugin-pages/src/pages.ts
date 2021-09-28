import { join } from 'path'
import { Page, PageRoutePath, Pages } from './types'
import { getFiles } from './files'
import { replaceWithSlash } from './utils'
import { CATCH_ALL_ROUTE_PATH } from './constants'
import { getLayoutProperties } from './parser'

/**
 * Return whether the current route node name represents a dynamic route
 * @param routeNodeName: route node name
 */
function isDynamicNodeName(routeNodeName: string): boolean {
  return routeNodeName.startsWith('_')
}

/**
 * Return whether the current route node name represents a nested route
 * @param routeNodeName: route node name
 */
function isNestedNodeName(routeNodeName: string): boolean {
  return routeNodeName.startsWith('$')
}

/**
 * Return whether the current route node name represents a dynamic and nested route
 * @param routeNodeName: route node name
 */
function isDynamicNestedNodeName(routeNodeName: string): boolean {
  return routeNodeName.startsWith('_$')
}

function getPageRoutePath(pathFromPagesDir: string): PageRoutePath {
  const routeNodeNames = pathFromPagesDir.split('.')[0].split('/')

  let parentRoutePath = ''
  let lastNodeName = routeNodeNames.pop()
  if (lastNodeName === 'index') {
    // treat xx/index as xx/, update lastNodeName
    lastNodeName = routeNodeNames.pop()
  } else if (lastNodeName === '_') {
    // treat /_ as catch all route
    lastNodeName = CATCH_ALL_ROUTE_PATH.slice(1)
  }

  // special case for 'index.vue' => '/'
  if (!lastNodeName) {
    return {
      parentRoutePath: '/',
      routePath: '/',
      nestedRoute: false,
    }
  }

  // setup parent route path
  for (const nodeName of routeNodeNames) {
    if (isDynamicNodeName(nodeName)) {
      parentRoutePath += `/:${nodeName.slice(1)}`
    } else if (isNestedNodeName(nodeName)) {
      parentRoutePath += `/${nodeName.slice(1)}`
    } else if (isDynamicNestedNodeName(nodeName)) {
      parentRoutePath += `/:${nodeName.slice(2)}`
    } else {
      parentRoutePath += `/${nodeName}`
    }
  }

  // setup route type by last node name
  const isDynamic = isDynamicNodeName(lastNodeName)
  const isNested = isNestedNodeName(lastNodeName)
  const isDynamicNested = isDynamicNestedNodeName(lastNodeName)

  // setup route path
  let routePath = parentRoutePath
  if (isDynamic) {
    routePath += `/:${lastNodeName.slice(1)}`
  } else if (isNested) {
    routePath += `/${lastNodeName.slice(1)}`
  } else if (isDynamicNested) {
    routePath += `/:${lastNodeName.slice(2)}`
  } else {
    routePath += `/${lastNodeName}`
  }

  return {
    parentRoutePath: parentRoutePath || '/', // if parentRoutePath is '', means parentRoutePath is /
    routePath,
    nestedRoute: isNested || isDynamicNested,
  }
}

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

  const pathFromRootDir = replaceWithSlash(join(pagesDir, pathFromPagesDir))
  const pathFromPagesDirNormalized = normalized(pathFromPagesDir)
  const { parentRoutePath, routePath, nestedRoute } =
    getPageRoutePath(pathFromPagesDir)
  const layout = getLayoutProperties(pathFromRootDir)

  return {
    pathFromPagesDir: pathFromPagesDir,
    pathFromRootDir,
    pathFromPagesDirNormalized,
    parentRoutePath,
    routePath,
    nestedRoute,
    layout,
  }
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

export const pages: Pages = {
  pathSet: new Set<string>(),
  sortedPages: [],
}

export function isDuplicatedPage(page: Page): boolean {
  if (pages.pathSet.has(page.pathFromPagesDirNormalized)) {
    console.log(
      `vite-plugin-pages warn: path of ${page.pathFromPagesDir} is Duplicated`,
    )
    return true
  }
  return false
}

export function initPages(pagesDir: string, extensions: string[]): Pages {
  // clear pages
  pages.pathSet = new Set<string>()
  pages.sortedPages = []

  // init pages
  const files = getFiles(pagesDir, extensions)
  for (const file of files) {
    const page = getPage(pagesDir, file)
    if (!isDuplicatedPage(page)) {
      pages.pathSet.add(page.pathFromPagesDirNormalized)
      pages.sortedPages.push(page)
    }
  }
  pages.sortedPages = sortPages(pages.sortedPages) // sort

  return pages
}

export function updatePages(
  event: string,
  pagesDir: string,
  pathFromPagesDir: string,
) {
  // don't need to update before we call initPages
  if (pages.sortedPages.length === 0) {
    return
  }

  if (event === 'add') {
    const page = getPage(pagesDir, pathFromPagesDir)
    if (!isDuplicatedPage(page)) {
      pages.pathSet.add(page.pathFromPagesDirNormalized)
      pages.sortedPages.push(page)
      sortPages(pages.sortedPages)
    }
  } else if (event === 'unlink') {
    // find page and remove. sortedPages is still sorted after we remove
    for (let i = 0; i < pages.sortedPages.length; i++) {
      const page = pages.sortedPages[i]
      if (page.pathFromPagesDir === pathFromPagesDir) {
        pages.sortedPages = pages.sortedPages.slice(i, 1)
        pages.pathSet.delete(page.pathFromPagesDirNormalized)
        break
      }
    }
  } else if (event === 'change') {
    // update page
    for (let i = 0; i < pages.sortedPages.length; i++) {
      if (pages.sortedPages[i].pathFromPagesDir === pathFromPagesDir) {
        pages.sortedPages[i] = getPage(pagesDir, pathFromPagesDir)
        break
      }
    }
  }
}
