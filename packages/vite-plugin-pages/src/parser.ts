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
  let layout
  layoutDeclare.forEach(({ node }) => {
    // @ts-ignore
    layout = node?.init?.value
  })

  return layout
}

export function setLayout(routes: Route[], options: PluginOptions = {}) {
  const layouts = getLayoutMap(
    options.layoutsDir,
    options.extension,
    options.excludes,
  )

  routes.map(route => {
    // 当没有 __layout 属性，也没有 default 的时候，不要转换
    if (!route.meta?.layout && !hasDefaultLayout(options.layoutsDir)) {
      return route
    }
    return {
      path: route.path,
      component: layouts.get(route.meta?.layout) || 'default',
      children: [route],
    }
  })
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
  directory: string,
  extensions: string[],
  excludes?: string[],
) {
  const layoutFiles = getLayoutFiles(directory, extensions, excludes)
  const layoutMap = new Map()

  for (const file of layoutFiles) {
    const parsedFile = parse(file)
    const layoutPath = join(directory, file)
    layoutMap.set(parsedFile.name, `() => import('${layoutPath}')`)
  }

  return layoutMap
}
