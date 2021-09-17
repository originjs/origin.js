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

const GLOBALCSS = /^global.*\.css$/
const GLOBALSASS = /^global.*\.scss$/
const GLOBALLESS = /^global.*\.less$/

//Get the path of the desired style sheet whose name starts with 'global'
function searchGlobalStyle(
  rootDir: string,
  options: PluginOptions,
  extension: string,
): Array<string> {
  let globalStylePaths: Array<string> = []
  fs.readdirSync(rootDir).forEach(item => {
    const targetPath = path.resolve(rootDir, item)
    if (fs.statSync(targetPath).isDirectory() && options.recursive) {
      globalStylePaths = globalStylePaths.concat(
        searchGlobalStyle(targetPath, options, extension),
      )
    } else {
      if (extension === '.css' && GLOBALCSS.test(item)) {
        globalStylePaths.push(targetPath)
      }
      if (extension === '.scss' && GLOBALSASS.test(item)) {
        globalStylePaths.push(targetPath)
      }
      if (extension === '.less' && GLOBALLESS.test(item)) {
        globalStylePaths.push(targetPath)
      }
    }
  })

  return globalStylePaths
}

export default (options: PluginOptions = {}): Plugin => {
  const opts: PluginOptions = Object.assign({}, DEFAULT_OPTIONS, options)
  let SASSFilePaths: Array<string>
  let LESSFilePaths: Array<string>

  return {
    name: 'vite:global-style',
    enforce: 'pre',
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
        const CSSFilePaths: Array<string> = searchGlobalStyle(
          assetsPath,
          opts,
          '.css',
        )
        SASSFilePaths = searchGlobalStyle(assetsPath, opts, '.scss')
        LESSFilePaths = searchGlobalStyle(assetsPath, opts, '.less')

        if (opts.cssEnabled) {
          CSSFilePaths.forEach(filePath => {
            filePath = filePath
              .replace(assetsPath, '/' + opts.sourcePath!)
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
        }
        return []
      },
    },
    transform(code: string, id: string) {
      if (/\.scss/g.test(id) && opts.sassEnabled && SASSFilePaths.length > 0) {
        const globalSASSImport = SASSFilePaths.map(filePath => {
          filePath = path
            .relative(path.join(id, '..'), filePath)
            .replace(/\\/g, '/')
          return `@import "${filePath}";`
        }).join(' ')
        return {
          code: `${globalSASSImport}\n${code}`,
          map: null,
        }
      }

      if (/\.less/g.test(id) && opts.lessEnabled && LESSFilePaths.length > 0) {
        const globalLESSImport = LESSFilePaths.map(filePath => {
          filePath = path
            .relative(path.join(id, '..'), filePath)
            .replace(/\\/g, '/')
          return `@import "${filePath}";`
        }).join(' ')
        return {
          code: `${globalLESSImport}\n${code}`,
          map: null,
        }
      }

      return null
    },
  }
}
