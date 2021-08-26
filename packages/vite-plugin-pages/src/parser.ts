import { vueSfcAstParser } from '@originjs/vue-sfc-ast-parser'
import fs from 'fs'
import { join, parse } from 'path'
import { getLayoutFiles } from './files'
import { PluginOptions, Route } from './types'

/**
 * get the __layout property from pages
 *
 * @param path file path in pages directory
 */
export function getLayoutProperties(path: string) {
  const source = fs.readFileSync(path, 'utf8')
  const { scriptAST, jscodeshiftParser } = vueSfcAstParser({ path, source })

  const layoutDeclare = scriptAST.find(jscodeshiftParser.VariableDeclarator, {
    id: {
      name: '__layout',
    },
  })
  let layout = ''
  // @ts-ignore
  layoutDeclare.forEach(({ node }) => {
    layout = node?.init?.value
  })

  return layout
}

function setLayoutChildren(
  route: Route,
  options: PluginOptions = {},
  layouts: any,
) {
  const hasDefault = hasDefaultLayout(<string>options.layoutsDir)
  const outRoute = route
  if (route.children && route.children.length > 0) {
    const childrenRoutes = setLayout(route.children, options)
    outRoute.children = childrenRoutes
  }

  // 当没有 __layout 属性，也没有 default 的时候，不要转换
  if (
    (!route.meta?.layout && !hasDefault) ||
    route.path === '/:pathMatch(.*)*'
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

export function setLayout(routes: Route[], options: PluginOptions = {}) {
  const layouts = getLayoutMap(
    options.layoutsDir,
    options.extension,
    options.excludes,
  )
  const outRoutes = routes.map(route =>
    setLayoutChildren(route, options, layouts),
  )
  return outRoutes
}

function hasDefaultLayout(layoutDir: string): boolean {
  const layoutFiles = getLayoutFiles(layoutDir, ['vue'])
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
  const layoutFiles = getLayoutFiles(directory, extensions, excludes)

  for (const file of layoutFiles) {
    const parsedFile = parse(file)
    let layoutPath = join(directory, file)
    layoutPath = layoutPath.replace(/\\/g, '/')
    layoutMap.set(parsedFile.name, `() => import('${layoutPath}')`)
  }

  return layoutMap
}
