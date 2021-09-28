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

export default async function creatPackageTemplate(
  config: any,
  uninstalled?: boolean,
) {
  try {
    await changeFileName(path.join(process.cwd(), config.name)).then(rs => {
      renderFile('package.json', config)
      renderFile('vite.config.ts', config)
      renderFile('src/main.ts', config)
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

function renderFile(filePath: string, config: any) {
  const renderPath: string = path.join(config.name, filePath)
  ejs.renderFile(renderPath, config, (err: any, str = '') => {
    fs.writeFileSync(renderPath, str)
  })
}
