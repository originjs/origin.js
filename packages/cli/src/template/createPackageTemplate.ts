import ejs from 'ejs'
import fs from 'fs'
import { exec } from 'child_process'
import chalk from 'chalk'
import ora from 'ora'
import path from 'path'

function changeFileName(filePath: string, config: any) {
  function removeRedundantPrefix(
    fileDir: string,
    filename: string,
    resolve: (value: unknown) => void,
  ) {
    if (!/^__/.test(filename)) {
      return
    }

    const oldPath: string = path.join(fileDir, filename)
    const newPath: string = path.join(fileDir, filename.slice(2))
    fs.renameSync(oldPath, newPath)
    renderFile(newPath, config)
    resolve('Successfully change file name!')
  }

  function changeNamefromDir(dir: string, resolve: (value: unknown) => void) {
    const stat: fs.Stats = fs.statSync(dir)
    if (!stat.isDirectory()) {
      return
    }

    const files: string[] = fs.readdirSync(dir)
    if (!files) {
      return
    }

    files.forEach((filename) => {
      changeNamefromDir(path.join(dir, filename), resolve)
      removeRedundantPrefix(dir, filename, resolve)
    })
  }

  return new Promise(function (resolve, reject) {
    try {
      changeNamefromDir(filePath, resolve)
    } catch (err) {
      reject('Failed to change file name')
    }
  })
}

export default async function createPackageTemplate(
  config: any,
  uninstalled?: boolean,
  projectDir?: string,
) {
  const targetPath = projectDir || process.cwd()
  await changeFileName(path.join(targetPath, config.name), config).then(rs => {
    console.log(rs)
    if (uninstalled) {
      return
    }

    const spinner = ora('Install project dependency.......')
    spinner.start()
    exec(`cd ${config.name} && git init && npm install`, (err: any) => {
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
  }).catch (rj => {
    console.log(chalk.red(rj))
  })
}

function renderFile(filePath: string, config: any) {
  const template: string = fs.readFileSync(filePath, 'utf-8')
  const outputCode: string = ejs.compile(template, {})(config)
  fs.writeFileSync(filePath, outputCode)
}
