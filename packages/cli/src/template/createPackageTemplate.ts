import ejs from 'ejs'
import fs from 'fs'
import { exec } from 'child_process'
import chalk from 'chalk'

export default function creatPackageTemplate(config: any) {
  ejs.renderFile(`${config.name}/package.json`, config, (err, str) => {
    fs.writeFile(`${config.name}/package.json`, str, () => {
      console.log(chalk.green('package.json is completed'))
    })
  })

  exec(`cd ${config.name} && npm install && git init`, (err: any) => {
    console.log(chalk.green('The dependency package is downloaded'))
    if (err) {
      // When there is an error, print out the error and exit the operation
      console.log(chalk.red('Failed to copy file'))
      process.exit()
    }
    console.log(chalk.green('Finished'))
    process.exit()
  })
}
