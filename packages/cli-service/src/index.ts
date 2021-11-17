import dev from './commands/dev'
import build from './commands/build'

/**
 * Execute the service commands.
 *
 * @param name - Command to excute. Receive `dev` or `build`.
 * @param execPath - Directory to build from. Default: `process.cwd()`.
 */
export async function run(name: 'dev' | 'build', execPath?: string) {
  if (name === 'dev') {
    await dev(execPath)
  } else if (name === 'build') {
    await build(execPath)
  }
}

export { dev, build }
