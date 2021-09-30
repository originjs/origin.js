import ejs from 'ejs'
import fs from 'fs'
import { exec } from 'child_process'
import chalk from 'chalk'
import ora from 'ora'
import path from 'path'

const TO_BE_RENDERED_FILE_ARRAY: Array<string> = ['package.json', 'vite.config.ts', 'src/main.ts', 'src/App.vue', 'src/pages/index.vue']

function changeFileName(filePath: string) {
  function removeRedundantPrefix(
    filename: string,
    resolve: (value: unknown) => void,
  ) {
    if (!/^_/.test(filename)) {
      return
    }

    const oldPath = path.join(filePath, filename)
    const newPath = path.join(filePath, filename.slice(1))
    fs.rename(oldPath, newPath, function (err) {
      if (!err) {
        resolve('Successfully change file name!')
      }
    })
  }

  return new Promise(function (resolve, reject) {
    fs.readdir(filePath, function (err, files) {
      files.forEach(function (filename) {
        removeRedundantPrefix(filename, resolve)
      })
    })
  })
}

export default async function createPackageTemplate(
  config: any,
  uninstalled?: boolean,
) {
  try {
    await changeFileName(path.join(process.cwd(), config.name)).then(rs => {
      for (const file of TO_BE_RENDERED_FILE_ARRAY) {
        renderFile(file, config)
      }
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
          console.log(chalk.green('   npm run dev'))
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
