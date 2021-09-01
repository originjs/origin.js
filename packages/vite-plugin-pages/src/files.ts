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
 * sort files, make sure that index.vue is the first element of each directory
 * @param filePaths
 */
export function sortFilePaths(filePaths: string[]): string[] {
  filePaths.sort((a, b) => {
    a = a.endsWith('index.vue') ? a.slice(0, a.length - 9) : a
    b = b.endsWith('index.vue') ? b.slice(0, b.length - 9) : b
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
