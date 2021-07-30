import dev from './commands/dev'
import build from './commands/build'

export async function run(name: 'dev' | 'build') {
  if (name === 'dev') {
    await dev()
  } else if (name === 'build') {
    await build()
  }
}

export { dev, build }
