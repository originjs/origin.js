import { join } from 'path'
import { Page } from './types'
import { getVueFiles } from './files'
import { replaceWithSlash } from './utils'

function getPage(pathFromPagesDir: string, pathFromRootDir: string): Page {
  return {
    pathFromPagesDir,
    pathFromRootDir,
  }
}

export function getPages(pagesDir: string): Page[] {
  const files = getVueFiles(pagesDir)
  return files.map(file =>
    getPage(file, replaceWithSlash(join(pagesDir, file))),
  )
}
