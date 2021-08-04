import ejs from 'ejs'
import fs from 'fs'
import { exec } from 'child_process'
import chalk from 'chalk'

export default function creatPackageTemplate(config: any) {
  ejs.renderFile(
    `${config.name}/package.json`,
    config,
    (err: any, str: string) => {
      fs.writeFile(`${config.name}/package.json`, str, () => {
        console.log(chalk.green('package.json is completed'))
      })
    },
  )

  exec(`cd ${config.name} && npm install && git init`, (err: any) => {
    if (err) {
      // When there is an error, print out the error
      console.log(
        chalk.red(
          'Failed to download dependencies and initialize git repository',
        ),
      )
      console.log(err)
    } else {
      console.log(chalk.green('The dependency package is downloaded'))
      console.log(chalk.green('Finished'))
    }
    // exit the operation
    process.exit()
  })
}
