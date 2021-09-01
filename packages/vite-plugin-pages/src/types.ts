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

export type Page = {
  /**
   * file path from pages directory
   */
  pathFromPagesDir: string

  /**
   * file path from root directory
   */
  pathFromRootDir: string
}

export type Route = {
  name?: string

  path: string

  component: string

  children?: Route[]

  meta?: Record<string, unknown>
}
