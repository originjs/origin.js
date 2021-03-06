export type PluginOptions = {
  /**
   * current workspace directory
   * @default process.cwd()
   */
  root: string

  /**
   * directory for pages components
   * @default 'src/pages'
   */
  pagesDir: string

  /**
   * directory for layouts components
   * @default 'src/layouts'
   */
  layoutsDir: string

  /**
   * Valid file extensions for pages components
   * @default ['vue']
   */
  extensions: string[]

  /**
   * List of components to exclude
   */
  excludes?: string[]
}

export type PageFile = {
  /**
   * file path from pages directory
   */
  pathFromPagesDir: string

  /**
   * file path from root directory
   */
  pathFromRootDir: string

  /**
   * normalize pathFromRootDir, use to check file path and sort
   * 1. make sure all path starts with /
   * 2. convert path like /_xx, /_$xx to /xx
   * 3. convert path like /_ to /~ (use for sort, because ASCII of ~ is 126)
   */
  pathFromPagesDirNormalized: string
}

export type PageRoutePath = {
  parentRoutePath: string

  routePath: string

  // Whether this route is a dynamic, nested or DynamicNested route
  nestedRoute: boolean
}

export type Layout = {
  layout: string
}

export type Page = PageFile & PageRoutePath & Layout

export type Pages = {
  /**
   * a set of pathFromPagesDirNormalized
   */
  pathSet: Set<string>

  /**
   * array of sored pages
   */
  sortedPages: Page[]
}

export type Route = {
  name?: string

  path: string

  component: string

  children?: Route[]

  meta?: Record<string, unknown>
}
