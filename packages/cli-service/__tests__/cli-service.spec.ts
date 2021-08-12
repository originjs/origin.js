import { run } from '../src'
import { build, createServer } from 'vite'

jest.mock('vite', () => {
  const server = {
    listen: jest.fn(),
  }
  return {
    build: jest.fn(),
    createServer: jest.fn().mockReturnValue(server),
  }
})

describe('cli', () => {
  afterEach(() => {
    jest.resetAllMocks()
  })

  test('call dev', async () => {
    await run('dev')
    expect(createServer).toHaveBeenCalledTimes(1)
  })

  test('call build', async () => {
    await run('build')
    expect(build).toHaveBeenCalledTimes(1)
  })
})
