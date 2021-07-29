#!/usr/bin/env node

const program = require('commander')
const { run } = require('@originjs/cli-service')

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
    run('dev')
  })

program
  .command('build')
  .description('alias of "npm run build" in the current project')
  .action(() => {
    run('build')
  })

program
  .command('webpackToVite')
  .description('Use vite in the current project')
  .action()

program
  .command('codemod')
  .description('Use vue-next in the current project')
  .action()

program.parse(process.argv)
