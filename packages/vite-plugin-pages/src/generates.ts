import { getLayoutProperties, setLayout } from './parser'
import { PluginOptions, Route, Page } from './types'
import { CATCH_ALL_ROUTE_PATH } from './constants'

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

function findParentRoute(
  parentPath: string,
  routes: Route[] | undefined,
): Route | undefined {
  if (!routes || routes.length < 1) {
    return
  }
  for (const route of routes) {
    if (route.path === parentPath) {
      return route
    }
    const child = findParentRoute(parentPath, route.children)
    if (child) {
      return child
    }
  }
}

export function generateRoutes(pages: Page[], options: PluginOptions): Route[] {
  let routes: Route[] = []
  for (const page of pages) {
    const { pathFromPagesDir, pathFromRootDir } = page

    const route: Route = {
      path: '',
      component: `() => import('/${page.pathFromRootDir}')`,
      meta: { layout: getLayoutProperties(pathFromRootDir) },
    }

    const routeNodeNames = pathFromPagesDir.split('.')[0].split('/')
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
      route.path = '/'
      routes.push(route)
      continue
    }

    // setup parent route path
    for (const nodeName of routeNodeNames) {
      if (isDynamicNodeName(nodeName)) {
        route.path += `/:${nodeName.slice(1)}`
      } else if (isNestedNodeName(nodeName)) {
        route.path += `/${nodeName.slice(1)}`
      } else if (isDynamicNestedNodeName(nodeName)) {
        route.path += `/:${nodeName.slice(2)}`
      } else {
        route.path += `/${nodeName}`
      }
    }

    const isDynamic = isDynamicNodeName(lastNodeName)
    const isNested = isNestedNodeName(lastNodeName)
    const isDynamicNested = isDynamicNestedNodeName(lastNodeName)
    if (isNested || isDynamicNested) {
      const parentRoute = findParentRoute(route.path || '/', routes)
      if (parentRoute) {
        if (isNested) {
          route.path += `/${lastNodeName.slice(1)}`
        } else if (isDynamicNested) {
          route.path += `/:${lastNodeName.slice(2)}`
        }
        parentRoute.children = parentRoute.children || []
        parentRoute.children.push(route)
      } else {
        console.log('vite-plugin-pages error: can not find parent route')
      }
    } else if (isDynamic) {
      route.path += `/:${lastNodeName.slice(1)}`
      routes.push(route)
    } else {
      route.path += `/${lastNodeName}`
      routes.push(route)
    }
  }

  // find and only keep first catch all route, move it to last
  const catchAllRoute = routes.find(
    route => route.path === CATCH_ALL_ROUTE_PATH,
  )
  if (catchAllRoute) {
    routes = routes.filter(route => route.path !== CATCH_ALL_ROUTE_PATH)
    routes.push(catchAllRoute)
  }

  // set layouts to routes
  routes = setLayout(routes, options)

  return routes
}

export function generateCode(routes: Route[]): string {
  // to string, and make sure component is a function
  const str = JSON.stringify(routes).replace(
    /"component":("(.*?)")/g,
    (str, replaceFrom, replaceTo) => {
      return str.replace(replaceFrom, replaceTo)
    },
  )
  // return generated code
  return `const routes = ${str};\n export default routes;`
}
