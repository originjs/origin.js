import { getArgs } from '../src/commands/codmod'

describe('codemod', () => {
  test('test args', () => {
    expect(getArgs('src')).toStrictEqual(['src'])
    expect(getArgs('src', { transformation: 'test' })).toStrictEqual([
      'src',
      '-t',
      'test',
    ])
  })
})
