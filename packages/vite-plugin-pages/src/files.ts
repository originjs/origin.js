import { globbySync } from 'globby'

export function getFiles(
  directory: string,
  extension: string,
  excludes?: string[],
): string[] {
  return globbySync(`**/*${extension}`, {
    gitignore: true,
    ignore: excludes,
    cwd: directory,
    onlyFiles: true,
  })
}

export function getVueFiles(directory: string, excludes?: string[]) {
  return getFiles(directory, '.vue', excludes)
}
