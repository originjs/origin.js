import dev from './commands/dev'
import build from './commands/build'

export async function run(name: 'dev' | 'build', execPath?: string) {
  if (name === 'dev') {
    await dev(execPath)
  } else if (name === 'build') {
    await build(execPath)
  }
}

export { dev, build }
