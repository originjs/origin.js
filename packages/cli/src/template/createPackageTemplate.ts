import ejs from 'ejs'
import fs from 'fs'
import { exec } from 'child_process'
import chalk from 'chalk'
import ora from 'ora'
import path from 'path'

function changeFileName(filePath: string) {
  const p = new Promise(function (resolve, reject) {
    fs.readdir(filePath, function (err, files) {
      files.forEach(function (filename) {
        if (/^_/.test(filename)) {
          const oldPath = path.join(filePath, filename)
          const newPath = path.join(filePath, filename.slice(1))
          fs.rename(oldPath, newPath, function (err) {
            if (!err) {
              resolve('Successfully change file name!')
            }
          })
        }
      })
    })
  })
  return p
}

export default function creatPackageTemplate(config: any, uninstalled?: boolean) {
  try {
    changeFileName(path.join(process.cwd(), config.name)).then(rs => {
      ejs.renderFile(
        `${config.name}/package.json`,
        config,
        (err: any, str = '') => {
          fs.writeFile(`${config.name}/package.json`, str, () => {
            console.log()
          })
        },
      )
      ejs.renderFile(
        `${config.name}/vite.config.ts`,
        config,
        (err: any, str = '') => {
          fs.writeFile(`${config.name}/vite.config.ts`, str, () => {
            console.log()
          })
        },
      )
      if (uninstalled) {
        return
      }
      const spinner = ora('Install project dependency.......')
      spinner.start()
      exec(`cd ${config.name} && npm install && git init`, (err: any) => {
        if (err) {
          // When there is an error, print out the error
          spinner.fail()
          console.log(
            chalk.red(
              'Failed to download dependencies and initialize git repository',
            ),
          )
          console.log(err)
        } else {
          spinner.succeed()
          console.log('  ')
          console.log(chalk.green('   cd  ' + config.name))
          console.log(chalk.green('   ori dev'))
          console.log('  ')
        }
        // exit the operation
        process.exit()
      })
    })
  } catch (error) {
    console.error(chalk.red('Failed to change file name'))
    console.log(error)
  }
}
