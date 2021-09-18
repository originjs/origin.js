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

type StyleData = {
  name: string,
  regex: RegExp,
  extension: string,
  globalStylePaths: Array<string>,
  isEnabled: (opt: PluginOptions) => boolean | undefined
}

const GLOBAL_STYLES_DATA: StyleData[] = [
  {
    name: 'css',
    regex: /^global.*\.css$/,
    extension: '.css',
    globalStylePaths: [],
    isEnabled: (opt: PluginOptions) => {
      return opt.cssEnabled
    },
  },
  {
    name: 'sass',
    regex: /^global.*\.scss$/,
    extension: '.scss',
    globalStylePaths: [],
    isEnabled: (opt: PluginOptions) => {
      return opt.sassEnabled
    },
  },
  {
    name: 'less',
    regex: /^global.*\.less$/,
    extension: '.less',
    globalStylePaths: [],
    isEnabled: (opt: PluginOptions) => {
      return opt.lessEnabled
    },
  },
]

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
      GLOBAL_STYLES_DATA.forEach(data => {
        if (data.extension === extension && data.regex.test(item)) {
          globalStylePaths.push(targetPath)
        }
      })
    }
  })

  return globalStylePaths
}

export default (options: PluginOptions = {}): Plugin => {
  const opts: PluginOptions = Object.assign({}, DEFAULT_OPTIONS, options)

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

        GLOBAL_STYLES_DATA.forEach(data => {
          data.globalStylePaths = searchGlobalStyle(assetsPath, opts, data.extension)
        })

        if (opts.cssEnabled) {
          const cssStylesData = GLOBAL_STYLES_DATA.filter(value => {
            return value.name === 'css'
          })[0]
          const CSSFilePaths = cssStylesData.globalStylePaths

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
      let result = null
      GLOBAL_STYLES_DATA.forEach(data => {
        if (data.name === 'css') return

        const regex = new RegExp(data.extension + '$', 'g')
        if (regex.test(id)
          && data.globalStylePaths.length > 0
          && data.isEnabled(opts)
        ) {
          const globalImport = data.globalStylePaths.map(filePath => {
            filePath = path
              .relative(path.join(id, '..'), filePath)
              .replace(/\\/g, '/')
            return `@import "${filePath}";`
          }).join(' ')
          result = {
            code: `${globalImport}\n${code}`,
            map: null,
          }
        }
      })

      return result
    },
  }
}
