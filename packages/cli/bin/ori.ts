#!/usr/bin/env node

import { Command } from 'commander'
import { codemod, codemodHelp } from '../src/commands/codmod'
import { toVite, toViteHelp } from '../src/commands/webpackToVite'
const { dev, build } = require('@originjs/cli-service')
const program = new Command()

program.name('ori').usage('<command> [options]')
program
  .command('create <app-name>')
  .description('create a new project powered by ori-cli-service')
  .action((name, options) => {
    require('../dist/commands/init').default(name, options)
  })

program
  .command('dev')
  .description('alias of "ori dev" in the current project')
  .allowUnknownOption()
  .action(() => {
    dev()
  })

program
  .command('build')
  .description('alias of "ori build" in the current project')
  .action(() => {
    build()
  })

program
  .command('tovite')
  .description('use vite in the current project')
  .allowUnknownOption()
  .option('-h, --help', 'show webpack-to-vite helps')
  .action((options) => {
    if (options.help) toViteHelp()
    else toVite(process.argv)
  })

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
