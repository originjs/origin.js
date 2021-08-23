import * as globby from 'globby'

export function getFiles(
  directory: string,
  extension: string,
  excludes?: string[],
): string[] {
  return globby.sync(`.`, {
    gitignore: true,
    ignore: excludes || [],
    cwd: directory,
    onlyFiles: true,
  })
}

export function getVueFiles(directory: string, excludes?: string[]) {
  return getFiles(directory, '.vue', excludes)
}
