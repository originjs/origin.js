import fs from 'fs-extra'
import ora from 'ora'
import inquirer from 'inquirer'
const download = require('download-git-repo')
import createPackageTemplate from '../template/createPackageTemplate'
import chalk from 'chalk'

const defaultOptions: any = {
  name: 'webProject',
  version: '1.0.0',
  license: 'ISC',
  author: '',
}
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
export default async function init(name: any) {
  if (!ifDirExists(name)) return false
  defaultOptions.name = name
  //Pull template from github to new project
  const spinner = ora('Downloading...')
  spinner.start()
  try {
    await new Promise<void>((resolve, reject) => {
      download(
        'pohunchn/vite-ts-quick#main',
        name,
        { clone: false },
        (error: any) => {
          if (error) {
            spinner.fail()
            return reject(error)
          }
          spinner.succeed()
          resolve()
        },
      )
    })
  } catch (error) {
    console.log(error)
    return false
  }
  try {
    const promptList = [
      {
        type: 'input',
        message: 'Please set the initial version number of the project:',
        name: 'version',
        default: '1.0.0',
      },
      {
        type: 'list',
        message: 'Please set the project code license:',
        name: 'license',
        choices: ['ISC', 'GPL', 'LGPL', 'MPL', 'BSD', 'MIT', 'Apache'],
        filter: (val: any) => {
          return val
        },
      },
    ]
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
  } catch (error) {
    console.error(chalk.red('Failed to initialize the template'))
    console.log(error)
    return false
  }
  try {
    createPackageTemplate(defaultOptions)
  } catch (error) {
    console.error(chalk.red('Failed to complete package.json'))
    console.log(error)
  }
}
