import { setLayout } from './parser'
import { PluginOptions, Route } from './types'
import { pages } from './pages'

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

export function generateRoutes(options: PluginOptions): Route[] {
  let routes: Route[] = []
  for (const page of pages.sortedPages) {
    const { pathFromRootDir, parentRoutePath, routePath, nestedRoute, layout } =
      page

    const route: Route = {
      path: routePath,
      component: `() => import('/${pathFromRootDir}')`,
      meta: { layout: layout },
    }

    // not nested route
    if (!nestedRoute) {
      routes.push(route)
      continue
    }

    // nested route
    const parentRoute = findParentRoute(parentRoutePath || '/', routes)
    if (parentRoute) {
      parentRoute.children = parentRoute.children || []
      parentRoute.children.push(route)
    } else {
      console.log('vite-plugin-pages error: can not find parent route')
    }
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
