import { parse as parseSFC, SFCBlock } from '@vue/compiler-sfc'
import fs from 'fs'
import { join, parse } from 'path'
import { getFiles } from './files'
import { PluginOptions, Route } from './types'
import { replaceWithSlash } from './utils'
import { CATCH_ALL_ROUTE_PATH } from './constants'

/**
 * get the layout property from pages
 *
 * @param path file path in pages directory
 */
export function getLayoutProperties(path: string) {
  let layout = ''
  const source = fs.readFileSync(path, 'utf8')
  const customBlocks: SFCBlock[] = parseSFC(source).descriptor.customBlocks
  const layoutBlock = customBlocks.find(
    (node: SFCBlock) => node.type === 'layout',
  )
  if (!layoutBlock) {
    return layout
  }
  const content: string = layoutBlock.content.trim()
  const pairs = content.split(':')
  if (pairs.length == 2 && pairs[0].trim() === 'layout') {
    layout = pairs[1].trim()
  } else {
    console.error('layout property was set in wrong way!')
  }
  return layout
}

function setLayoutChildren(route: Route, options: PluginOptions, layouts: any) {
  const hasDefault = hasDefaultLayout(<string>options.layoutsDir)
  const outRoute = route
  if (route.children && route.children.length > 0) {
    outRoute.children = setLayout(route.children, options)
  }

  // When there is no layout property and no default layout, don't transform route
  if (
    (!route.meta?.layout && !hasDefault) ||
    route.path === CATCH_ALL_ROUTE_PATH
  ) {
    return outRoute
  }
  if (outRoute.meta?.layout && layouts.get(outRoute.meta?.layout)) {
    return {
      path: outRoute.path,
      component: layouts.get(outRoute.meta?.layout),
      children: [outRoute],
    }
  } else {
    return {
      path: outRoute.path,
      component: layouts.get('default'),
      children: [outRoute],
    }
  }
}

export function setLayout(routes: Route[], options: PluginOptions) {
  const layouts = getLayoutMap(
    options.layoutsDir,
    options.extensions,
    options.excludes,
  )
  return routes.map(route => setLayoutChildren(route, options, layouts))
}

function hasDefaultLayout(layoutDir: string): boolean {
  const layoutFiles = getFiles(layoutDir, ['vue'])
  for (const file of layoutFiles) {
    if (file === 'default.vue') {
      return true
    }
  }
  return false
}

function getLayoutMap(
  directory: string | undefined,
  extensions: string[] | undefined,
  excludes?: string[],
) {
  const layoutMap = new Map()
  if (!directory || !extensions) {
    return layoutMap
  }
  const layoutFiles = getFiles(directory, extensions, excludes)

  for (const file of layoutFiles) {
    const parsedFile = parse(file)
    const layoutPath = replaceWithSlash(join(directory, file))
    layoutMap.set(parsedFile.name, `() => import('/${layoutPath}')`)
  }

  return layoutMap
}
