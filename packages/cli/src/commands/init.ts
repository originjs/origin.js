import fs from 'fs-extra'
import ora from 'ora'
import inquirer from 'inquirer'
import createPackageTemplate from '../template/createPackageTemplate'
import chalk from 'chalk'
import path from 'path'
import { promptList } from '../config/prompt'
import {
  PluginChoiceOption,
  assetsOption,
  componentsOption,
  contentOption,
  pagesOption,
} from '../config/plugins'

type initCliOptions = {
  default?: boolean
  allPlugins?: boolean
  uninstalled?: boolean
}

type initProjectOptions = {
  name: string
  version: string
  license: string
  plugins: PluginChoiceOption[]
}

const defaultOptions: initProjectOptions = {
  name: '',
  version: '1.0.0',
  license: 'ISC',
  plugins: [],
}

function cpdir(dirOld: string, dirNew: string, name: string) {
  const p = new Promise(function (resolve, reject) {
    fs.mkdir(path.join(dirNew, name), function (err) {
      resolve('Successfully created the folder!')
      dirNew = path.join(dirNew, name)
      walkDir(dirOld, dirNew)
    })
    function walkDir(dirOld: string, dirNew: string) {
      const oldList = fs.readdirSync(dirOld)
      oldList.forEach(function (item) {
        if (fs.statSync(path.join(dirOld, item)).isDirectory()) {
          fs.mkdirSync(path.join(dirNew, item))
          walkDir(path.join(dirOld, item), path.join(dirNew, item))
        } else {
          fs.copyFileSync(path.join(dirOld, item), path.join(dirNew, item))
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
      assetsOption,
      componentsOption,
      contentOption,
      pagesOption,
    ]
  }

  try {
    await initializeModules(name, options.uninstalled)
  } catch (error) {
    console.log(error)
    return false
  }
}
