import { join } from 'path'
import { Page } from './types'
import { getFiles, sortFilePaths } from './files'
import { replaceWithSlash } from './utils'

function getPage(pathFromPagesDir: string, pathFromRootDir: string): Page {
  return {
    pathFromPagesDir,
    pathFromRootDir,
  }
}

export function getPages(pagesDir: string, extensions: string[]): Page[] {
  const files = sortFilePaths(getFiles(pagesDir, extensions))
  return files.map(file =>
    getPage(file, replaceWithSlash(join(pagesDir, file))),
  )
}
