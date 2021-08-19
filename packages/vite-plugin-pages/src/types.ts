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
   * Valid file extensions for pages components
   * @default ['vue']
   */
  extension?: string[]

  /**
   * List of components to exclude
   */
  excludes?: string[]
}

export type Route = {
  name?: string

  path: string

  component: string

  children?: Route[]
}
