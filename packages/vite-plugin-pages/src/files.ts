import * as globby from 'globby'
import { replaceWithSlash } from './utils'

function getExcludes(excludes: string[]) {
  return ['node_modules', '.git', '**/__*__/**', ...excludes]
}

export function getFiles(
  directory: string,
  extension: string,
  excludes?: string[],
): string[] {
  excludes = excludes ? excludes.map(exclude => replaceWithSlash(exclude)) : []
  return globby.sync(`**/*${extension}`, {
    gitignore: true,
    ignore: getExcludes(excludes),
    cwd: replaceWithSlash(directory),
    onlyFiles: true,
  })
}

export function getVueFiles(directory: string, excludes?: string[]) {
  const files = getFiles(directory, '.vue', excludes)

  // sort files, make sure that index.vue is the first element of each directory
  files.sort((a, b) => {
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

  return files
}

export function getLayoutFiles(
  directory: string,
  extensions: string[],
  excludes?: string[],
) {
  let files: string[] = []
  extensions.forEach(extension => {
    files = files.concat(getFiles(directory, extension, excludes))
  })
  return files
}
