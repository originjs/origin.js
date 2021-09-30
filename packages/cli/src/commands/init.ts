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
} from '../config/plugins'

type initCliOptions = {
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
  ComponentsPluginImported: false,
  contentPluginImported: false,
}

function cpdir(dirOld: string, dirNew: string, name: string) {
  const p = new Promise(function (resolve, reject) {
    fs.mkdir(path.join(dirNew, name), function (err) {
      resolve('Successfully created the folder!')
      dirNew = path.join(dirNew, name)
      const skipFiles: Array<string> = getSkipFilesWithRelativePath()
      walkDir(dirOld, dirNew, skipFiles)
    })

    // add files that need to be skipped here
    function getSkipFilesWithRelativePath(): Array<string> {
      const skipFiles = []
      if (!defaultOptions.globalStylePluginImported) {
        skipFiles.push('src/assets/global-theme.css')
      }

      if (!defaultOptions.contentPluginImported) {
        skipFiles.push('src/pages/content.vue', 'src/assets/when_you_believe.yaml')
      }

      return skipFiles
    }

    function walkDir(dirOldAbsolutePath: string, dirNewAbsolutePath: string, skipFiles: Array<string>) {
      const oldList = fs.readdirSync(dirOldAbsolutePath)
      oldList.forEach(function(item) {
        const oldAbsolutePath: string = path.join(dirOldAbsolutePath, item)
        const newAbsolutePath: string = path.join(dirNewAbsolutePath, item)
        const relativePath: string = path.relative(dirOld, oldAbsolutePath)
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
  return p
}

const SOURCES_DIRECTORY = path.resolve(__dirname, '../../oriTemplate')

const ifDirExists = (name: any) => {
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

const checkOptions = async () => {
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

const initializeModules = async (name: any, uninstalled?: boolean) => {
  const spinnerCopy = ora('Downloading...')
  spinnerCopy.start()
  await cpdir(SOURCES_DIRECTORY, process.cwd(), name)
    .then(rs => {
      spinnerCopy.succeed()
      try {
        createPackageTemplate(defaultOptions, uninstalled)
      } catch (error) {
        console.error(chalk.red('Failed to complete package.json'))
        console.log(error)
      }
    })
    .catch(rj => {
      spinnerCopy.fail()
    })
}

export default async function init(
  name: string | null = 'webProject',
  options: initCliOptions = {
    default: false,
    allPlugins: false,
    uninstalled: false,
  },
) {
  if (!options.default && options.allPlugins) {
    console.error(chalk.red('Failed to initialize the template'))
    console.log(`Would you like to use \`ori init -d -a\`?`)
    return false
  }

  if (!name || !ifDirExists(name)) {
    console.error(chalk.red('Failed to initialize the template'))
    return false
  }
  defaultOptions.name = name

  if (!options.default) {
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
    ]
  }

  defaultOptions.plugins.forEach((plugin: PluginChoiceOption) => {
    const pluginState = `${plugin.name}PluginImported`
    defaultOptions[pluginState] = true
  })

  try {
    await initializeModules(name, options.uninstalled)
  } catch (error) {
    console.log(error)
    return false
  }
}
