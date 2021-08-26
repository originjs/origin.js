import { getLayoutProperties, setLayout } from './parser'
import { PluginOptions, Route, Page } from './types'

/**
 * Return whether the current route node name represents a dynamic route
 * @param routeNodeName: route node name
 */
function isDynamicNodeName(routeNodeName: string): boolean {
  return routeNodeName.startsWith('_')
}

/**
 * Return whether the current route node name represents a catch all route
 * @param routeNodeName: route node name
 */
function isCatchAllNodeName(routeNodeName: string): boolean {
  return routeNodeName === '_'
}

export function generateRoutes(
  pages: Page[],
  options: PluginOptions = {},
): Route[] {
  let routes: Route[] = []
  pages.forEach(page => {
    const { pathFromPagesDir,pathFromRootDir } = page
    // remove file extension, split with '/' to get route nodes
    const routeNodeNames = pathFromPagesDir.split('.')[0].split('/')

    const route: Route = {
      name: '',
      path: '',
      // @ts-ignore
      component: `() => import('${page.pathFromRootDir}')`,
      meta: { layout: getLayoutProperties(pathFromRootDir) },
    }

    let parentRoutes = routes
    for (const routeNodeName of routeNodeNames) {
      const isDynamic = isDynamicNodeName(routeNodeName)
      const isCatchAll = isCatchAllNodeName(routeNodeName)

      if (route.name) {
        if (routeNodeName !== 'index') {
          route.name += `-${routeNodeName}`
        }
      } else {
        route.name = routeNodeName
      }
      const parentRoute = parentRoutes.find(pRoute => pRoute.name == route.name)

      if (parentRoute) {
        // init parentRoute.children, update parentRoutes
        parentRoute.children = parentRoute.children || []
        parentRoutes = parentRoute.children
      }

      if (isDynamic) {
        if (isCatchAll) {
          route.path = '/:pathMatch(.*)*'
        } else {
          route.path += `/:${routeNodeName.slice(1)}`
        }
      } else {
        if (routeNodeName !== 'index') {
          route.path += `/${routeNodeName}`
        } else if (route.path === '') {
          route.path += `/`
        }
      }
    }
    parentRoutes.push(route)
  })

  // find and only keep first catch all route, move it to last
  const catchAllRoute = routes.find(route => route.path === '/:pathMatch(.*)*')
  if (catchAllRoute) {
    routes = routes.filter(route => route.path !== '/:pathMatch(.*)*')
    routes.push(catchAllRoute)
  }

  // set layouts to routes
  routes=setLayout(routes, options)

  return routes
}
