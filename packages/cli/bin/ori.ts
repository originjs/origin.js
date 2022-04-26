#!/usr/bin/env node

import { Command } from 'commander'
import { codemod, codemodHelp } from '../src/commands/codmod'
import { toVite, toViteHelp } from '../src/commands/webpackToVite'
const { dev, build } = require('@originjs/cli-service')
const program = new Command()
const version = require('../package.json').version

program
  .name('ori')
  .usage('<command> [options]')
  .version(version, '-v, --version', 'display version number')
program.name('ori').usage('<command> [options]')
program
  .command('init <app-name>')
  .description('init a new project')
  .option('-d, --default', 'skip init project options')
  .option('-a, --all-plugins', 'create project with all plugins')
  .option('-u, --uninstalled', 'skip install denpendencies')
  .action((name, options) => {
    require('../src/commands/init').default(name, options)
  })

program
  .command('dev')
  .description('alias of "ori dev" in the current project')
  .option('-n, --no-browser', 'not open the app in the browser automatically')
  .option('-c, --auto-close [delay]', 'close server with time delay', '5000')
  .action(async options => {
    await dev(null, options)
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
  .action(options => {
    if (options.help) toViteHelp()
    else toVite(process.argv)
  })

program
  .command('tovue3')
  .description('use vue-next in the current project')
  .allowUnknownOption()
  .option('-h, --help', 'show vue-codemod helps')
  .action(options => {
    if (options.help) codemodHelp()
    else codemod(process.argv)
  })

program.parse(process.argv)
