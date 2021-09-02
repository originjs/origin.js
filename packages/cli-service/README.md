# `cli-service`

CLI for creating server and provides commands to control it. 

## Usage

```
const cliService = require('cli-service');
cliService.run('dev', 'yourProjectPath');
cliService.run('build', 'yourProjectPath');
```

### run

```
export async function run(name: 'dev' | 'build', execPath?: string)
```

Execute the commands. It receives `name` and optional `execPath` as parameters with no returns. The name of command can be `dev` or `build`.

### dev

```
async function (execPath?: string): Promise<ViteDevServer | null>
```

Read your configuration to create a dev server and listen to that port. It receives optional `execPath` as parameter and returns `ViteDevServer` asynchronously. If it failed to create a vite dev server, this function returns `null`.

### build

```
export default async function (execPath?: string): Promise<void>
```

Read your configuration to build the project. It receives optional `execPath` as parameter with no returns.