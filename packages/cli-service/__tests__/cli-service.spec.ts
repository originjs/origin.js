import { run } from '../src'
import { build, createServer } from 'vite'
import { join } from 'path'

vi.mock('vite', () => {
  const server = {
    listen: vi.fn(),
  }
  return {
    build: vi.fn(),
    createServer: vi.fn().mockReturnValue(server),
    loadConfigFromFile: vi.fn(),
  }
})

describe('cli', () => {
  afterEach(() => {
    vi.resetAllMocks()
  })

  test('call dev', async () => {
    const path = join(__dirname, './file/servicedemo')
    await run('dev', path)
    expect(createServer).toHaveBeenCalledTimes(1)
  })

  test('call build', async () => {
    const path = join(__dirname, './file/servicedemo')
    await run('build', path)
    expect(build).toHaveBeenCalledTimes(1)
  })
})
