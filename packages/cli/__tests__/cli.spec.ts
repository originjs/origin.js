import { commandSync, ExecaSyncReturnValue, SyncOptions } from 'execa'
import { join } from 'path'

const CLI_PATH = join(__dirname, '../bin/ori')
const DEMO_PATH = join(__dirname, '../demo')

const run = (
  args: string[],
  options: SyncOptions<string> = {},
): ExecaSyncReturnValue<string> => {
  return commandSync(`npx ts-node ${CLI_PATH} ${args.join(' ')}`, options)
}

test('ori -h', () => {
  const { stdout, exitCode } = run(['-h'])
  expect(stdout).toMatchSnapshot('A1')
  expect(exitCode).toBe(0)
})

test('ori --help', () => {
  const { stdout, exitCode } = run(['--help'])
  expect(stdout).toMatchSnapshot('A2')
  expect(exitCode).toBe(0)
})

test('ori init without app-name', () => {
  try {
    run(['init'])
  } catch (e) {
    expect(e.stderr).toContain("error: missing required argument 'app-name'")
  }
})

test.skip('ori init with app-name', () => {
  const { stdout, exitCode } = run(['init', 'demo-app'])
  expect(stdout).toMatchSnapshot('A3')
  expect(exitCode).toBe(0)
})

test('ori init --help', () => {
  const { stdout, exitCode } = run(['init', '--help'])
  expect(stdout).toMatchSnapshot('A4')
  expect(exitCode).toBe(0)
})

test.skip('ori dev', () => {
  const { stdout, exitCode } = run(['dev'])
  expect(stdout).toMatchSnapshot('A5')
  expect(exitCode).toBe(0)
})

test.skip('ori build', () => {
  const { stdout, exitCode } = run(['build'])
  expect(stdout).toMatchSnapshot('A6')
  expect(exitCode).toBe(0)
})

test.skip('ori tovue3', () => {
  const { stdout, exitCode } = run(['tovue3', 'src', '-a'])
  expect(stdout).toMatchSnapshot('A7')
  expect(exitCode).toBe(0)
})

test.skip('ori tovite', () => {
  const { stdout, exitCode } = run(['tovite', '-d', DEMO_PATH])
  expect(stdout).toContain('Conversion finished')
  expect(exitCode).toBe(0)
})
