import * as globby from 'globby'
import { replaceWithSlash } from './utils'

function getExcludes(excludes: string[]) {
  return ['node_modules', '.git', '**/__*__/**', ...excludes]
}

export function getFiles(
  directory: string,
  extensions: string[],
  excludes?: string[],
): string[] {
  // setup excludes
  excludes = getExcludes((excludes || []).map(ex => replaceWithSlash(ex)))

  // return read files by extensions
  const pattern =
    extensions.length > 1
      ? `**/*.{${extensions.join(',')}}`
      : `**/*.${extensions[0]}`
  return globby.sync(pattern, {
    gitignore: true,
    ignore: excludes,
    cwd: replaceWithSlash(directory),
    onlyFiles: true,
  })
}

/**
 * sort files:
 * 1. treat xx, _xx, _$xx as same name
 * 2. in each directory: index.vue is the first, _.vue is the last
 * @param filePaths
 */
export function sortFilePaths(filePaths: string[]): string[] {
  function normalStr(str: string): string {
    if (!str.startsWith('/')) {
      str = `/${str}`
    }
    return str
      .replace('index.vue', '') // remove 'index.vue'
      .replace('_.vue', '~.vue') // '_.vue' => '~.vue'
      .replace(/\/_/g, '/') // '/_' => '/'
      .replace(/\/\$/g, '/') // '/$' => '/'
  }

  filePaths.sort((a, b) => {
    a = normalStr(a)
    b = normalStr(b)
    if (a < b) {
      return -1
    }
    if (a > b) {
      return 1
    }
    return 0
  })
  return filePaths
}
