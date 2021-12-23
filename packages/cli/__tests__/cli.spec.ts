import fs from 'fs-extra'
import path from 'path'
import results from './results'
import { initializeModules } from '../src/commands/init'
import run, { DEMO_PATH } from '../../cli-test-utils/execCommands'
import create from '../../cli-test-utils/createTestProject'
import runServer from '../../cli-test-utils/createTestProjectServer'
import runBuild from '../../cli-test-utils/buildTestProject'
import {
  defaultOptions,
  getConfigs,
} from '../../cli-test-utils/getPluginConfig'

test('ori -h', async () => {
  const { stdout, exitCode } = await run(['-h'])
  expect(stdout).toMatchSnapshot('A1')
  expect(exitCode).toEqual(0)
}, 10000)

test('ori --help', async () => {
  const { stdout, exitCode } = await run(['--help'])
  expect(stdout).toMatchSnapshot('A2')
  expect(exitCode).toEqual(0)
}, 10000)

test('ori init without app-name', async () => {
  try {
    await run(['init'])
  } catch (e: any) {
    expect(e.stderr).toContain("error: missing required argument 'app-name'")
  }
}, 10000)

test('ori init with failed arguments', async () => {
  try {
    const { stdout } = await run(['init', 'testInitFailedArguments', '-a'])
    expect(stdout).toMatch(`Would you like to use \`ori init -d -a\`?`)
  } catch (e: any) {
    console.log(e)
  }
}, 10000)

test('ori init with all plugins', async () => {
  const project = await create('test_all_plugins', false, ['-d', '-a', '-u'])

  try {
    expect(project.has('index.html')).toEqual(true)
    const indexContent = project.read('index.html')
    expect(indexContent).toMatch(
      `<script type="module" src="/src/main.ts"></script>`,
    )

    expect(project.has('src/main.ts')).toEqual(true)
    expect(project.has('src/App.vue')).toEqual(true)
    expect(project.has('src/pages')).toEqual(true)
    expect(project.has('src/layouts')).toEqual(true)
    expect(project.has('src/components')).toEqual(true)
    expect(project.has('src/assets')).toEqual(true)

    const appFile = project.read('src/App.vue')
    expect(appFile.replace(/\r\n/g, '\n')).toMatchSnapshot('A3')

    const mainFile = project.read('src/main.ts')
    expect(mainFile).toMatchSnapshot('A3')

    expect(project.has('package.json')).toEqual(true)
    const packageConfig = project.read('package.json')
    expect(packageConfig).toMatchSnapshot('A3')

    expect(project.has('vite.config.ts')).toEqual(true)
    const viteConfig = project.read('vite.config.ts')
    expect(viteConfig).toMatchSnapshot('A3')

    // skip files
    expect(project.has('src/pages/content.vue')).toEqual(true)
    expect(project.has('src/layouts/profile.vue')).toEqual(true)
    expect(project.has('src/assets/when_you_believe.yaml')).toEqual(true)
    expect(project.has('src/pages/users/_user.vue')).toEqual(true)
    expect(project.has('src/pages/_.vue')).toEqual(true)
    expect(project.has('src/pages/$child.vue')).toEqual(true)
    expect(project.has('src/pages/login.vue')).toEqual(true)
    expect(project.has('src/layouts/empty.vue')).toEqual(true)
    expect(project.has('src/pages/markdown.vue')).toEqual(true)
    expect(project.has('src/assets/originjs_readme.md')).toEqual(true)
  } finally {
    // convert cleaner to comments if you want to debug with project files
    if (project) {
      project.clear()
    }
  }
}, 10000)

test('ori init without plugins', async () => {
  const project = await create('test_no_plugins', false, ['-d', '-u'])

  try {
    expect(project.has('index.html')).toEqual(true)
    const indexContent = project.read('index.html')
    expect(indexContent).toMatch(
      `<script type="module" src="/src/main.ts"></script>`,
    )

    expect(project.has('src/main.ts')).toEqual(true)
    expect(project.has('src/App.vue')).toEqual(true)
    expect(project.has('src/pages')).toEqual(true)
    expect(project.has('src/layouts')).toEqual(true)
    expect(project.has('src/components')).toEqual(true)
    expect(project.has('src/assets')).toEqual(true)

    const appFile = project.read('src/App.vue')
    expect(appFile).toMatchSnapshot('A4')

    const mainFile = project.read('src/main.ts')
    expect(mainFile).toMatchSnapshot('A4')

    expect(project.has('package.json')).toEqual(true)
    const packageConfig = project.read('package.json')
    expect(packageConfig).toMatchSnapshot('A4')

    expect(project.has('vite.config.ts')).toEqual(true)
    const viteConfig = project.read('vite.config.ts')
    expect(viteConfig).toMatchSnapshot('A4')

    // skip files
    expect(project.has('src/pages/content.vue')).toEqual(false)
    expect(project.has('src/layouts/profile.vue')).toEqual(false)
    expect(project.has('src/assets/when_you_believe.yaml')).toEqual(false)
    expect(project.has('src/pages/users/_user.vue')).toEqual(false)
    expect(project.has('src/pages/_.vue')).toEqual(false)
    expect(project.has('src/pages/$child.vue')).toEqual(false)
    expect(project.has('src/pages/login.vue')).toEqual(false)
    expect(project.has('src/layouts/empty.vue')).toEqual(false)
    expect(project.has('src/pages/markdown.vue')).toEqual(false)
    expect(project.has('src/assets/originjs_readme.md')).toEqual(false)
  } finally {
    if (project) {
      project.clear()
    }
  }
}, 10000)

test('ori init with test utils', async () => {
  const testConfigs = ['none', 'jest', 'vitest']
  const ProjectPath = path.join(
    process.cwd(),
    'packages',
    'cli-test-utils',
    DEMO_PATH,
  )
  for (const value of testConfigs) {
    const config = Object.assign({}, defaultOptions, { test: value })
    await initializeModules(`test_utils_${value}`, config, true, ProjectPath)
    try {
      if (value === 'jest') {
        expect(
          fs.readFileSync(
            path.join(ProjectPath, `test_utils_${value}`, 'package.json'),
            'utf-8',
          ),
        ).toMatch(results.packageJsonScriptWithJest)
      } else if (value === 'vitest') {
        expect(
          fs.readFileSync(
            path.join(ProjectPath, `test_utils_${value}`, 'package.json'),
            'utf-8',
          ),
        ).toMatch(results.packageJsonScriptWithVitest)
        expect(
          fs.readFileSync(
            path.join(ProjectPath, `test_utils_${value}`, 'vite.config.ts'),
            'utf-8',
          ),
        ).toMatch(results.viteConfigWithVitest)
      }
      // skip files
      expect(
        fs.pathExistsSync(
          path.join(ProjectPath, `test_utils_${value}`, 'babel.config.js'),
        ),
      ).toEqual(value === 'jest')
      expect(
        fs.pathExistsSync(
          path.join(ProjectPath, `test_utils_${value}`, 'jest.config.js'),
        ),
      ).toEqual(value === 'jest')
      expect(
        fs.pathExistsSync(
          path.join(ProjectPath, `test_utils_${value}`, 'shim.d.ts'),
        ),
      ).toEqual(value === 'jest')
      expect(
        fs.pathExistsSync(
          path.join(ProjectPath, `test_utils_${value}`, 'test'),
        ),
      ).toEqual(value !== 'none')
    } finally {
      fs.remove(path.join(ProjectPath, `test_utils_${value}`))
    }
  }
})

test('ori init with variable plugins', async () => {
  const configs = getConfigs()
  const ProjectPath = path.join(
    process.cwd(),
    'packages',
    'cli-test-utils',
    DEMO_PATH,
  )
  for (const config of configs) {
    await initializeModules(config.name, config, true, ProjectPath)
    try {
      const mainFile = fs.readFileSync(
        path.join(ProjectPath, config.name, 'src/main.ts'),
        'utf-8',
      )
      const indexFile = fs.readFileSync(
        path.join(ProjectPath, config.name, 'src/pages/index.vue'),
        'utf-8',
      )
      const viteConfigFile = fs.readFileSync(
        path.join(ProjectPath, config.name, 'vite.config.ts'),
        'utf-8',
      )
      const PackageJsonFile = fs.readFileSync(
        path.join(ProjectPath, config.name, 'package.json'),
        'utf-8',
      )

      if (config.pagesPluginImported) {
        expect(mainFile).toMatch(results.mainWithPagesPlugin)
        expect(indexFile).toMatch(results.indexWithPagesPluginLogin)
        expect(indexFile).toMatch(results.indexWithPagesPluginChild)
        expect(viteConfigFile).toMatch(results.viteConfigImportPagesPlugin)
        expect(viteConfigFile).toMatch(results.viteConfigWithPagesPlugin)
        expect(PackageJsonFile).toMatch(results.packageJsonWithPagesPlugin)
      } else {
        // skip files
        expect(
          fs.pathExistsSync(
            path.join(ProjectPath, config.name, 'src/pages/users/_user.vue'),
          ),
        ).toEqual(false)
        expect(
          fs.pathExistsSync(
            path.join(ProjectPath, config.name, 'src/pages/_.vue'),
          ),
        ).toEqual(false)
        expect(
          fs.pathExistsSync(
            path.join(ProjectPath, config.name, 'src/pages/$child.vue'),
          ),
        ).toEqual(false)
        expect(
          fs.pathExistsSync(
            path.join(ProjectPath, config.name, 'src/pages/login.vue'),
          ),
        ).toEqual(false)
        expect(
          fs.pathExistsSync(
            path.join(ProjectPath, config.name, 'src/layouts/empty.vue'),
          ),
        ).toEqual(false)
        if (config.markdownPluginImported) {
          expect(mainFile).toMatch(results.mainImportMarkdownComponents)
          expect(mainFile).toMatch(results.mainWithMarkdownPlugin)
        }
        if (config.contentPluginImported) {
          expect(mainFile.replace(/\r\n/g, '\n')).toMatch(
            results.mainImportContentComponents,
          )
          expect(mainFile.replace(/\r\n/g, '\n')).toMatch(
            results.mainWithContentPlugin,
          )
        }
      }

      if (config.markdownPluginImported) {
        expect(indexFile).toMatch(results.indexWithMarkdownPlugin)
        expect(viteConfigFile).toMatch(results.viteConfigImportMarkdownPlugin)
        expect(viteConfigFile).toMatch(results.viteConfigWithMarkdownPlugin)
        expect(viteConfigFile.replace(/\r\n/g, '\n')).toMatch(
          results.viteConfigWithMarkdownPluginVue,
        )
        expect(PackageJsonFile).toMatch(results.packageJsonWithMarkdownPlugin)
      } else {
        // skip files
        expect(
          fs.pathExistsSync(
            path.join(ProjectPath, config.name, 'src/pages/markdown.vue'),
          ),
        ).toEqual(false)
        expect(
          fs.pathExistsSync(
            path.join(
              ProjectPath,
              config.name,
              'src/assets/originjs_readme.md',
            ),
          ),
        ).toEqual(false)
      }

      if (config.contentPluginImported) {
        expect(indexFile).toMatch(results.indexWithContentPlugin)
        expect(viteConfigFile).toMatch(results.viteConfigImportContentPlugin)
        expect(viteConfigFile).toMatch(results.viteConfigWithContentPlugin)
        expect(PackageJsonFile).toMatch(results.packageJsonWithContentPlugin)
      } else {
        // skip files
        expect(
          fs.pathExistsSync(
            path.join(ProjectPath, config.name, 'src/pages/content.vue'),
          ),
        ).toEqual(false)
        expect(
          fs.pathExistsSync(
            path.join(
              ProjectPath,
              config.name,
              'src/assets/when_you_believe.yaml',
            ),
          ),
        ).toEqual(false)
        if (!config.pagesPluginImported && !config.federationPluginImported) {
          expect(
            fs.pathExistsSync(
              path.join(ProjectPath, config.name, 'src/layouts/profile.vue'),
            ),
          ).toEqual(false)
        }
      }

      if (config.globalStylePluginImported) {
        expect(viteConfigFile).toMatch(
          results.viteConfigImportGlobalStylePlugin,
        )
        expect(viteConfigFile).toMatch(results.viteConfigWithGlobalStylePlugin)
        expect(PackageJsonFile).toMatch(
          results.packageJsonWithGlobalStylePlugin,
        )
      } else {
        const appFile = fs.readFileSync(
          path.join(ProjectPath, config.name, 'src/App.vue'),
          'utf-8',
        )
        expect(appFile).toMatch(results.appFileWithoutGlobalStylePlugin)
      }

      if (config.componentsPluginImported) {
        expect(viteConfigFile).toMatch(results.viteConfigImportComponentsPlugin)
        expect(viteConfigFile.replace(/\r\n/g, '\n')).toMatch(
          results.viteConfigWithComponentsPlugin,
        )
        expect(PackageJsonFile).toMatch(results.packageJsonWithComponentsPlugin)
      } else {
        const defaultFile = fs.readFileSync(
          path.join(ProjectPath, config.name, 'src/layouts/default.vue'),
          'utf-8',
        )
        expect(defaultFile).toMatch(
          results.defaultLayoutImportWithoutComponentsPlugin,
        )
        expect(defaultFile.replace(/\r\n/g, '\n')).toMatch(
          results.defaultLayoutScriptWithoutComponentsPlugin,
        )
      }
    } finally {
      fs.remove(path.join(ProjectPath, config.name))
    }
  }
}, 30000)

test('ori init --help', async () => {
  const { stdout, exitCode } = await run(['init', '--help'])
  expect(stdout).toMatchSnapshot('A5')
  expect(exitCode).toEqual(0)
}, 10000)

test('ori dev', async () => {
  const project = await create('test_server', true)
  const { stdout } = await runServer('test_server')
  expect(stdout).toMatch(results.serverRunning)
  // TODO: write files and update changes
  project.clear()
}, 50000)

test('ori dev --help', async () => {
  const { stdout, exitCode } = await run(['dev', '--help'])
  expect(stdout).toMatchSnapshot('A6')
  expect(exitCode).toEqual(0)
}, 10000)

test('ori build', async () => {
  const project = await create('test_build', true)
  await runBuild('test_build')
  expect(project.has('dist')).toEqual(true)
  project.clear()
}, 50000)

test('ori build --help', async () => {
  const { stdout, exitCode } = await run(['build', '--help'])
  expect(stdout).toMatchSnapshot('A7')
  expect(exitCode).toEqual(0)
}, 10000)

test('ori tovue3', async () => {
  const { exitCode, stdout } = await run(['tovue3', '--help'])
  expect(stdout).toMatchSnapshot('A8')
  expect(exitCode).toEqual(0)
}, 10000)

test('ori tovite', async () => {
  const { exitCode, stdout } = await run(['tovite', '--help'])
  expect(stdout).toMatchSnapshot('A9')
  expect(exitCode).toEqual(0)
}, 10000)
