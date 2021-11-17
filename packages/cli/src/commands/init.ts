import fs from 'fs-extra'
import ora from 'ora'
import inquirer from 'inquirer'
import createPackageTemplate from '../template/createPackageTemplate'
import chalk from 'chalk'
import path from 'path'
import { promptList } from '../config/prompt'
import {
  PluginChoiceOption,
  globalStyleOption,
  componentsOption,
  contentOption,
  pagesOption,
  markdownOption,
  federationOption,
} from '../config/plugins'

type InitCliOptions = {
  default?: boolean
  allPlugins?: boolean
  uninstalled?: boolean
}

const defaultOptions: any = {
  name: '',
  version: '1.0.0',
  license: 'ISC',
  plugins: [],
  pagesPluginImported: false,
  globalStylePluginImported: false,
  componentsPluginImported: false,
  contentPluginImported: false,
  markdownPluginImported: false,
  federationPluginImported: false,
}

/**
 * Recursively copy directories and files.
 *
 * @param dirOld - Directory to copy from.
 * @param dirNew - Directory to copy to.
 * @param name - Name of directory which will be copied.
 * @param config - Project configuration.
 */
export function cpdir(dirOld: string, dirNew: string, name: string, config: any = defaultOptions) {
  const asyncCopy = new Promise((resolve, reject) => {
    try {
      fs.mkdirSync(path.join(dirNew, name))
      resolve('Successfully created the folder!')
      dirNew = path.join(dirNew, name)
      const skipFiles: Array<string> = getSkipFilesWithRelativePath()
      walkDir(dirOld, dirNew, skipFiles)
    } catch (err) {
      console.log(err)
      reject('Failed to create the folder')
    }

    // add files that need to be skipped here
    function getSkipFilesWithRelativePath(): Array<string> {
      const skipFiles = []
      if (!config.pagesPluginImported) {
        skipFiles.push(
          'src/pages/users',
          'src/pages/_.vue',
          'src/pages/$child.vue',
          'src/pages/login.vue',
          'src/layouts/empty.vue',
        )
      }

      if (!config.contentPluginImported) {
        skipFiles.push(
          'src/pages/__content.vue',
          'src/assets/when_you_believe.yaml',
        )
      }

      if (
        !config.pagesPluginImported &&
        !config.contentPluginImported &&
        (!config.federationPluginImported || config.federationType == 'Remote')
      ) {
        skipFiles.push('src/layouts/__profile.vue')
      }

      if (!config.markdownPluginImported) {
        skipFiles.push(
          'src/pages/markdown.vue',
          'src/assets/originjs_readme.md',
        )
      }

      if (
        !config.federationPluginImported ||
        config.federationType != 'Remote'
      ) {
        skipFiles.push('src/components/HelloWorld.vue')
      }

      if (!config.federationPluginImported || config.federationType != 'Host') {
        skipFiles.push(
          'src/components/FederationErrorComponent.vue',
          'src/pages/federation.vue',
        )
      }

      return skipFiles
    }

    function walkDir(
      dirOldAbsolutePath: string,
      dirNewAbsolutePath: string,
      skipFiles: Array<string>,
    ) {
      const oldList = fs.readdirSync(dirOldAbsolutePath)
      oldList.forEach((item) => {
        const oldAbsolutePath: string = path.join(dirOldAbsolutePath, item)
        const newAbsolutePath: string = path.join(dirNewAbsolutePath, item)
        const relativePath: string = path
          .relative(dirOld, oldAbsolutePath)
          .replace(/\\/g, '/')
        if (skipFiles.indexOf(relativePath) >= 0) {
          return
        }

        if (fs.statSync(oldAbsolutePath).isDirectory()) {
          fs.mkdirSync(newAbsolutePath)
          walkDir(oldAbsolutePath, newAbsolutePath, skipFiles)
        } else {
          fs.copyFileSync(oldAbsolutePath, newAbsolutePath)
        }
      })
    }
  })
  return asyncCopy
}

const SOURCES_DIRECTORY = path.resolve(__dirname, '../../oriTemplate')

function ifDirExists(name: any) {
  // Check whether there is a folder with the same name as the project name in the current folder
  // and whether the project name is legal
  const reg = /[< > / \ | : " * ?]/g
  if (!fs.existsSync(name) && !reg.test(name)) {
    return true
  } else {
    console.error(
      chalk.red('The file name is invalid or the file name already exists'),
    )
    return false
  }
}

async function checkOptions() {
  await inquirer
    .prompt(promptList)
    .then((answers: any) => {
      Object.assign(defaultOptions, answers)
    })
    .catch((error: any) => {
      if (error.isTtyError) {
        // Prompt couldn't be rendered in the current environment
        console.error(
          chalk.red("Prompt couldn't be rendered in the current environment"),
        )
        console.log(error)
      } else {
        // Something else went wrong
        console.log(error)
      }
    })
}

/**
 * Initialize project modules.
 *
 * @param name - Project name.
 * @param config - Project configuration.
 * @param uninstalled - Not install dependencies after initialization when its value is `true`.
 * @param projectDir - Project path. Default: `process.cwd()`.
 * @param sourceDirectory - Template path. Default: `../../oriTemplate`.
 */
export async function initializeModules(
  name: any,
  config: any,
  uninstalled?: boolean,
  projectDir?: string,
  sourceDirectory?: string,
) {
  const spinnerCopy = ora('Downloading...')
  spinnerCopy.start()
  const targetPath = projectDir
    ? path.resolve(process.cwd(), projectDir)
    : process.cwd()
  const source = sourceDirectory || SOURCES_DIRECTORY
  await cpdir(source, targetPath, name, config)
    .then(async rs => {
      spinnerCopy.succeed()
      console.log(rs)
      try {
        await createPackageTemplate(config, uninstalled, targetPath)
      } catch (error) {
        console.error(chalk.red('Failed to complete package.json'))
        console.log(error)
      }
    })
    .catch(rj => {
      spinnerCopy.fail()
      console.log(chalk.red(rj))
    })
}

/**
 * Initialize a project.
 *
 * @param name - Name of project to be initialized. Default: `webProject`.
 * @param options - Command options.
 * @returns If it failed to create a project, this function returns `false` asynchronously. Instead it returns `true`.
 */
export default async function init(
  name: string | null = 'webProject',
  options?: InitCliOptions,
): Promise<boolean> {
  if (!options?.default && options?.allPlugins) {
    console.error(chalk.red('Failed to initialize the template'))
    console.log(`Would you like to use \`ori init -d -a\`?`)
    return false
  }

  if (!name || !ifDirExists(name)) {
    console.error(chalk.red('Failed to initialize the template'))
    return false
  }
  defaultOptions.name = name

  if (!options?.default) {
    try {
      await checkOptions()
    } catch (error) {
      console.error(chalk.red('Failed to initialize the template'))
      console.log(error)
      return false
    }
  } else if (options.allPlugins) {
    defaultOptions.plugins = [
      globalStyleOption,
      componentsOption,
      contentOption,
      pagesOption,
      markdownOption,
      federationOption,
    ]
  }

  defaultOptions.plugins.forEach((plugin: PluginChoiceOption) => {
    const pluginState = `${plugin.name}PluginImported`
    defaultOptions[pluginState] = true

    if (plugin.name == 'federation' && !defaultOptions.federationType) {
      defaultOptions.federationType = 'Host'
    }
  })

  try {
    await initializeModules(name, defaultOptions, options?.uninstalled)
    return true
  } catch (error) {
    console.log(error)
    return false
  }
}
