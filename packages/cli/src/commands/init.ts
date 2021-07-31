import fs from 'fs-extra'
import ora from 'ora'
import inquirer from 'inquirer'
const download = require('download-git-repo')
import createPackageTemplate from '../template/createPackageTemplate'
import chalk from 'chalk'
// import path from 'path'
// import {exec} from 'child_process'
// import ejs from 'ejs'
const defaultOptions: any = {
  name: 'webProject',
  version: '1.0.0',
  license: 'ISC',
  author: '',
}
const ifDirExists = (name: any) => {
  // Check whether there is a folder with the same name as the project name in the current folder
  // and whether the project name is legal
  if (!fs.existsSync(name)) {
    const reg = /[< > / \ | : " * ?]/g
    if (reg.test(name)) {
      console.error('ProjectName is illegal')
      return false
    }
  } else {
    console.error('Dir already exists')
    return false
  }
}
export default async function init(name: any) {
  ifDirExists(name)
  defaultOptions.name = name
  //Pull template from github to new project
  const spinner = ora('Downloading...')
  spinner.start()
  try {
    await new Promise<void>((resolve, reject) => {
      download(
        'Janson1012/myTemplate01',
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
      {
        type: 'input',
        message: 'Please set the project author:',
        name: 'author',
        default: '',
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
