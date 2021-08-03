#!/usr/bin/env node

const program = require('commander')
const { dev, build } = require('@originjs/cli-service')
const { codemod, codemodHelp } = require('../dist/commands/codmod')

program.name('Ori').usage('<commend> [options]')
program
  .command('create <app-name>')
  .description('create a new project powered by ori-cli-service')
  .action((name, options) => {
    require('../dist/commands/init').default(name, options)
  })

program
  .command('dev')
  .description('alias of "npm run dev" in the current project')
  .allowUnknownOption()
  .action(() => {
    dev()
  })

program
  .command('build')
  .description('alias of "npm run build" in the current project')
  .action(() => {
    build()
  })

program
  .command('tovite')
  .description('use vite in the current project')
  .action()

program
  .command('tovue3')
  .description('use vue-next in the current project')
  .allowUnknownOption()
  .option('-h, --help', 'show vue-codemod helps')
  .action((options) => {
    if (options.help) codemodHelp()
    else codemod(process.argv)
  })

program.parse(process.argv)
