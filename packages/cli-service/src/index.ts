import dev from './commands/dev'
import build from './commands/build'

export async function run(name: 'dev' | 'build') {
  if(name === 'dev') {
    await dev()
  } else {
    await build()
  }
}
