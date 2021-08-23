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
  return getFiles(directory, '.vue', excludes)
}
