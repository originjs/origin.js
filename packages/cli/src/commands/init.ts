import fs from 'fs-extra'
import ora from 'ora'
import inquirer from 'inquirer'
import createPackageTemplate from '../template/createPackageTemplate'
import chalk from 'chalk'
import path from 'path'

const defaultOptions: any = {
  name: '',
  version: '1.0.0',
  license: 'ISC',
  plugins:[],
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
          fs.copyFile(path.join(dirOld, item), path.join(dirNew, item))
        }
      })
    }
  })
  return p
}

const SOURCES_DIRECTORY = path.resolve(__dirname, '../../../oriTemplate')

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
export default async function init(
  name: any = 'webProject',
  options: any = { default: false },
) {
  if (!ifDirExists(name)) return false
  defaultOptions.name = name

  if (!options.default) {
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
          type: 'checkbox',
          message: 'Please select the plugin you need(Use enter to skip):',
          name: 'plugins',
          choices:  [
            { value: 'assets',name: 'Assets:Processing pictures, public styles, fonts, etc.' },
            { value: 'components',name: 'Components:Reusable vue components' },
            { value: 'content',name: 'Content:Reusable vue components' },
            { value: 'layouts',name: 'Layouts:Page Layout' },
            { value: 'pages',name: 'Pages' },
            { value: 'static',name: 'Static' },
            { value: 'monitor',name: 'Monitor:Performance/error monitoring' },
            { value: 'micro',name: 'Micro:Micro front end configuration' },
        ],
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
              chalk.red(
                "Prompt couldn't be rendered in the current environment",
              ),
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
  }

  try {
    const spinnerCopy = ora('Downloading...')
    spinnerCopy.start()
    cpdir(SOURCES_DIRECTORY, process.cwd(), name)
      .then(rs => {
        spinnerCopy.succeed()
        try {
          createPackageTemplate(defaultOptions)
        } catch (error) {
          console.error(chalk.red('Failed to complete package.json'))
          console.log(error)
        }
      })
      .catch(rj => {
        spinnerCopy.fail()
      })
  } catch (error) {
    console.log(error)
    return false
  }
}
