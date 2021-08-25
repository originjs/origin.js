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

function prepareRoutes(routes: Route[], parentRoute?: Route): Route[] {
  for (const route of routes) {
    if (parentRoute && route.path.startsWith('/')) {
      route.path = route.path.slice(1)
    }
    if (route.children && route.children.length > 0) {
      route.children = prepareRoutes(route.children, route)
    }
  }
  return routes
}

export function generateRoutes(
  pages: Page[],
  options: PluginOptions = {},
): Route[] {
  let routes: Route[] = []

  pages.forEach(page => {
    const { pathFromPagesDir } = page
    // remove file extension, split with '/' to get route nodes
    const routeNodeNames = pathFromPagesDir.split('.')[0].split('/')

    const route: Route = {
      name: '',
      path: '',
      component: `${page.pathFromRootDir}`,
      meta: { layout: getLayoutProperties(pathFromPagesDir) },
    }

    let parentRoutes = routes
    for (const routeNodeName of routeNodeNames) {
      const isDynamic = isDynamicNodeName(routeNodeName)
      const isCatchAll = isCatchAllNodeName(routeNodeName)

      route.name += route.name ? `-${routeNodeName}` : routeNodeName
      const parentRoute = parentRoutes.find(pRoute => pRoute.name == route.name)

      if (parentRoute) {
        // init parentRoute.children, update parentRoutes, continue to next loop
        parentRoute.children = parentRoute.children || []
        parentRoutes = parentRoute.children
        route.path = ''
        continue
      }

      if (isDynamic) {
        if (isCatchAll) {
          route.path = '/:pathMatch(.*)*'
        } else {
          route.path += `/:${routeNodeName.slice(1)}`
        }
      } else {
        route.path += `/${routeNodeName}`
      }
    }
    parentRoutes.push(route)
  })

  routes = prepareRoutes(routes)
  // find and only keep first catch all route, move it to last
  const catchAllRoute = routes.find(route => route.path === '/:pathMatch(.*)*')
  if (catchAllRoute) {
    routes = routes.filter(route => route.path !== '/:pathMatch(.*)*')
    routes.push(catchAllRoute)
  }

  // set layouts to routes
  setLayout(routes, options)

  return routes
}
