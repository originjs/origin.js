import { join } from 'path'
import { Page, PageRoutePath, Pages } from './types'
import { getFiles } from './files'
import { replaceWithSlash, warn } from './utils'
import { CATCH_ALL_ROUTE_PATH } from './constants'
import { getLayoutProperties } from './parser'

enum NodeNameType {
  Normal, // normal route node name, eg. /xx
  Dynamic, // dynamic route node name, starts with _, eg. /_xx
  Nested, // nested route node name, starts with $, eg. /$xx
  DynamicNested, // dynamic and nested route node name, starts with _$. eg. /_$xx
}

function getNodeNameType(routeNodeName: string): NodeNameType {
  if (routeNodeName.startsWith('_$')) {
    return NodeNameType.DynamicNested
  }
  if (routeNodeName.startsWith('_')) {
    return NodeNameType.Dynamic
  }
  if (routeNodeName.startsWith('$')) {
    return NodeNameType.Nested
  }
  return NodeNameType.Normal
}

function getRoutePathByNodeName(nodeName: string, type: NodeNameType): string {
  if (type === NodeNameType.DynamicNested) {
    return `/:${nodeName.slice(2)}`
  }
  if (type === NodeNameType.Dynamic) {
    return `/:${nodeName.slice(1)}`
  }
  if (type === NodeNameType.Nested) {
    return `/${nodeName.slice(1)}`
  }
  return `/${nodeName}`
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
  for (const name of routeNodeNames) {
    parentRoutePath += getRoutePathByNodeName(name, getNodeNameType(name))
  }

  // get last route node name type, setup flag nestedRoute
  const lastNodeNameType = getNodeNameType(lastNodeName)
  const nestedRoute =
    lastNodeNameType === NodeNameType.DynamicNested ||
    lastNodeNameType === NodeNameType.Nested

  // setup route path
  let routePath = parentRoutePath
  routePath += getRoutePathByNodeName(lastNodeName, lastNodeNameType)

  return {
    parentRoutePath: parentRoutePath || '/', // if parentRoutePath is '', means parentRoutePath is /
    routePath,
    nestedRoute,
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
    pathFromPagesDir,
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
    warn(`path of ${page.pathFromPagesDir} is Duplicated, skip`)
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
