import { createServer } from 'vite'
import run, { DEMO_PATH } from '../../cli-test-utils/execCommands'
import create from '../../cli-test-utils/createTestProject'
import runServer from '../../cli-test-utils/createTestProjectServer'
import runBuild from '../../cli-test-utils/buildTestProject'

test('ori -h', async () => {
  const { stdout, exitCode } = await run(['-h'])
  expect(stdout).toMatchSnapshot('A1')
  expect(exitCode).toBe(0)
})

test('ori --help', async () => {
  const { stdout, exitCode } = await run(['--help'])
  expect(stdout).toMatchSnapshot('A2')
  expect(exitCode).toBe(0)
})

test('ori init without app-name', async () => {
  try {
    await run(['init'])
  } catch (e) {
    expect(e.stderr).toContain("error: missing required argument 'app-name'")
  }
})

test('ori init with failed arguments', async () => {
  try {
    const { stdout } = await run(['init', 'testInitFailedArguments', '-a'])
    expect(stdout).toMatch(`Would you like to use \`ori init -d -a\`?`)
  } catch (e) {
    console.log(e)
  }
})

test('ori init with all plugins', async () => {
  const project = await create('testAllPlugins', ['-d', '-a', '-u'])

  try {
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
  } finally {
    if (project) {
      project.clear()
    }
  }
}, 20000)

test('ori init without plugins', async () => {
  const project = await create('testNoPlugins')

  try {
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
  } finally {
    if (project) {
      project.clear()
    }
  }
}, 20000)

test('ori init --help', async () => {
  const { stdout, exitCode } = await run(['init', '--help'])
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

test.skip('ori tovue3', async () => {
  const { stdout, exitCode } = await run(['tovue3', 'src', '-a'])
  expect(stdout).toMatchSnapshot('A7')
  expect(exitCode).toBe(0)
})

test.skip('ori tovite', async () => {
  const { stdout, exitCode } = await run(['tovite', '-d', DEMO_PATH])
  expect(stdout).toContain('Conversion finished')
  expect(exitCode).toBe(0)
})
