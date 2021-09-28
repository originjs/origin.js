import { PLUGIN_NAME } from './constants'

export function replaceWithSlash(pathStr: string) {
  return pathStr.replace(/\\/g, '/')
}

export function log(message: string): void {
  console.log(`${PLUGIN_NAME}:` + message)
}

export function warn(message: string): void {
  console.warn(`${PLUGIN_NAME}:` + message)
}

export function error(message: string): void {
  console.error(`${PLUGIN_NAME}:` + message)
}
