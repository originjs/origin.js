import { Command } from 'commander';
import { build } from './commands/build';

const program = new Command();
program.version(`@ori/cli ${require('../package.json').version}`)
    .usage('<command> [options]');

program.command('buid <dir>')
    .description('Compiles the application for production deployment')
    .action((dir) => {
        build(dir);
    });

program.parse(process.argv);
