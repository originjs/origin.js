import ejs from 'ejs'
import fs from 'fs'
import { exec } from 'child_process'
import chalk from 'chalk'
import ora from 'ora'

export default function creatPackageTemplate(config: any) {
  ejs.renderFile(
    `${config.name}/package.json`,
    config,
    (err: any, str: string) => {
      fs.writeFile(`${config.name}/package.json`, str, () => {
        console.log()
      })
    },
  )
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
}
