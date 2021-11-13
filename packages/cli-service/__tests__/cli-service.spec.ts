import { run } from '../src'
import { build, createServer } from 'vite'
import { join } from 'path'

jest.mock('vite', () => {
  const server = {
    listen: jest.fn(),
  }
  return {
    build: jest.fn(),
    createServer: jest.fn().mockReturnValue(server),
    loadConfigFromFile: jest.fn(),
  }
})

describe('cli', () => {
  afterEach(() => {
    jest.resetAllMocks()
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
