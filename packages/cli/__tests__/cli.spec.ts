import { createServer } from 'vite'
import run, { DEMO_PATH } from '../../cli-test-utils/execCommands'
import create from '../../cli-test-utils/createTestProject'
import runServer from '../../cli-test-utils/createTestProjectServer'
import runBuild from '../../cli-test-utils/buildTestProject'

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

test('ori init without app-name', async () => {
  try {
    await create('')
  } catch (e) {
    expect(e.stderr).toContain('Failed to initialize the template')
    expect(e.stderr).toContain("error: missing required argument 'app-name'")
  }
})

test('ori init with failed arguments', async () => {
  try {
    await create('', ['-a'])
  } catch (e) {
    expect(e.stderr).toContain('Failed to initialize the template')
  }
})

test('ori init with all plugins', async () => {
  const project = await create('testAllPlugins', ['-d', '-a'])

  expect(project.has('index.html')).toBe(true)
  const indexContent = await project.read('index.html')
  expect(indexContent).toMatch(
    `<script type="module" src="/src/main.ts"></script>`,
  )

  expect(project.has('./src/main.ts')).toBe(true)
  expect(project.has('./src/App.vue')).toBe(true)
  expect(project.has('./src/pages')).toBe(true)
  expect(project.has('./src/layouts')).toBe(true)
  expect(project.has('./src/components')).toBe(true)
  expect(project.has('./src/assets')).toBe(true)

  expect(project.has('package.json')).toBe(true)
  const packageConfig = await project.read('package.json')
  expect(packageConfig).toMatchSnapshot('A3')

  expect(project.has('vite.config.ts')).toBe(true)
  const viteConfig = await project.read('vite.config.ts')
  expect(viteConfig).toMatchSnapshot('A3')

  project.clear()
}, 15000)

test('ori init without plugins', async () => {
  const project = await create('testNoPlugins')

  expect(project.has('index.html')).toBe(true)
  const indexContent = await project.read('index.html')
  expect(indexContent).toMatch(
    `<script type="module" src="/src/main.ts"></script>`,
  )

  expect(project.has('./src/main.ts')).toBe(true)
  expect(project.has('./src/App.vue')).toBe(true)

  expect(project.has('package.json')).toBe(true)
  const packageConfig = await project.read('package.json')
  expect(packageConfig).toMatchSnapshot('A4')

  expect(project.has('vite.config.ts')).toBe(true)
  const viteConfig = await project.read('vite.config.ts')
  expect(viteConfig).toMatchSnapshot('A4')

  project.clear()
}, 10000)

test('ori init --help', () => {
  const { stdout, exitCode } = run(['init', '--help'])
  expect(stdout).toMatchSnapshot('A5')
  expect(exitCode).toBe(0)
})

test.skip('ori dev', async () => {
  const project = await create('testServer')

  await runServer('testServer')
  expect(createServer).toHaveBeenCalledTimes(1)
  // TODO: write files and update changes

  project.clear()
}, 10000)

test.skip('ori build', async () => {
  const project = await create('testBuild')

  await runBuild('testBuild')
  expect(project.has('dist')).toBe(true)

  project.clear()
}, 10000)

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
