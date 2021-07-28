import { Command } from 'commander';
import { build } from './commands/build';
import { init } from './commands/init';
const program = new Command();
program.version(`@ori/cli ${require('../package.json').version}`)
    .usage('<command> [options]');

program.command('create <app-name>')
    .description('create a new project powered by ori-cli-service')
    .action((name, options) => {
        init(name, options)
})

program.command('buid <dir>')
    .description('Compiles the application for production deployment')
    .action((dir) => {
        build(dir);
    });

program.parse(process.argv);
