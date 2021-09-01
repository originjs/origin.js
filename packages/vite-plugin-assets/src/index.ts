import path from 'path'
import fs from 'fs'
import { Plugin, HtmlTagDescriptor } from 'vite'

export type PluginOptions = {
  sourcePath?: string
  cssEnabled?: boolean
  sassEnabled?: boolean
  lessEnabled?: boolean
  recursive?: boolean
}

const DEFAULT_OPTIONS: PluginOptions = {
  sourcePath: 'src/assets',
  cssEnabled: true,
  sassEnabled: true,
  lessEnabled: true,
  recursive: true,
}

const GLOBALCSS = /^global-.*\.css$/
const GLOBALSASS = /^global-.*\.scss$/
const GLOBALLESS = /^global-.*\.less$/

//Get the path of the desired style sheet whose name starts with 'global-'
function searchGlobalCss(
  rootDir: string,
  options: PluginOptions,
): Array<string> {
  let globalCssPaths: Array<string> = []
  fs.readdirSync(rootDir).forEach(item => {
    const targetPath = path.resolve(rootDir, item)
    if (fs.statSync(targetPath).isDirectory() && options.recursive) {
      globalCssPaths = globalCssPaths.concat(searchGlobalCss(targetPath, options))
    } else {
      if (options.cssEnabled && GLOBALCSS.test(item)) {
        globalCssPaths.push(targetPath)
      }
      if (options.sassEnabled && GLOBALSASS.test(item)) {
        globalCssPaths.push(targetPath)
      }
      if (options.lessEnabled && GLOBALLESS.test(item)) {
        globalCssPaths.push(targetPath)
      }
    }
  })

  return globalCssPaths
}

export default (options: PluginOptions = {}): Plugin => {
  const opts: PluginOptions = Object.assign({}, DEFAULT_OPTIONS, options)

  return {
    name: 'vite:assets',
    transformIndexHtml: {
      enforce: 'pre',
      transform(
        _,
        { filename }: { filename: string },
      ): Array<HtmlTagDescriptor> {
        const HtmlTagDescriptors: Array<HtmlTagDescriptor> = []
        const assetsPath: string = path.resolve(
          filename,
          '..',
          opts.sourcePath!,
        )
        const filePaths: Array<string> = searchGlobalCss(assetsPath, opts)

        filePaths.forEach(filePath => {
          filePath = filePath
            .replace(assetsPath, opts.sourcePath!)
            .replace(/\\/g, '/')
          HtmlTagDescriptors.push({
            tag: 'link',
            attrs: {
              rel: 'stylesheet',
              href: filePath,
            },
            injectTo: 'head',
          })
        })

        return HtmlTagDescriptors
      },
    },
  }
}
