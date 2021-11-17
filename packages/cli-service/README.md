# cli-service

CLI for creating server and provides commands to control it.<br/>
> Using [Vite](https://github.com/vitejs/vite) export APIs.

## Usage

```
const cliService = require('cli-service');
cliService.run('dev', 'yourProjectPath');
cliService.run('build', 'yourProjectPath');
```

## APIs
### run

```
async function run(name: 'dev' | 'build', execPath?: string)
```

Execute the service commands. 
It receives `name` and optional `execPath` as parameters with no returns. 
The name of command can be `dev` or `build`.

### dev

```
async function (execPath?: string, options?: DevCliOptions): Promise<boolean>
```

Read your local configuration to create a vite server and listen to that port for development.
It receives optional `execPath` and command `options` as parameter.
If it failed to create the vite server, this function returns `false` asynchronously. Instead it returns `true`.

### build

```
async function (execPath?: string): Promise<void>
```

Read your local configuration to build the project for production.
It receives optional `execPath` as parameter with no returns.