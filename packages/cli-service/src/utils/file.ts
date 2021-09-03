import fse from 'fs-extra'

export function loadPackageJson(rootDir: string) {
  if (fse.pathExistsSync(`${rootDir}/package.json`)) {
    return fse.readJsonSync(`${rootDir}/package.json`)
  } else {
    return null
  }
}
