#!/usr/bin/env node

const program = require('commander')
const { dev, build } = require('@originjs/cli-service')
const { codemod } = require('../dist/commands/codmod')

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
  .command('webpackToVite')
  .description('use vite in the current project')
  .action()

program
  .command('codemod <file-pattern>')
  .description('use vue-next in the current project')
  .option(
    '-t, --transformation <rules>',
    'Name or path of the transformation module',
  )
  .option('-a, --runAllTransformation', 'run all transformation module')
  .option('-p, --params', 'Custom params to the transformation')
  .option(
    '-f, --reportFormatter <type>',
    'Specify an output report formatter  choices: [table, detail, log]',
  )
  .action((name, options) => {
    codemod(name, options)
  })

program.parse(process.argv)
