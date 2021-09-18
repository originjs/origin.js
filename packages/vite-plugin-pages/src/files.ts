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
