# vite-plugin-global-style
`CSS`, `SASS`, `LESS` files named starting with `global` are automatically added to the vite global style

## Install
```shell
npm install @originjs/vite-plugin-global-style --save-dev
```
or
```shell
yarn add @originjs/vite-plugin-global-style --dev
```

## Usage
add `@originjs/vite-plugin-global-style` in `vite.config.js`.
```js
import globalStyle from '@originjs/vite-plugin-global-style'

export default {
    plugins: [
        globalStyle(
            /* options */
        )
    ]
}
```

### Options
- `sourcePath` 

  - Type: `string`
  - Default: `src/assets`

  The relative path of the assets directory to the project.

- `cssEnabled`

  - Type: `boolean`
  - Default: `true`

  Whether to automatically load the CSS global style.

- `sassEnabled`

  - Type: `boolean`
  - Default: `true`

  Whether to automatically load the SASS global style.

- `lessEnabled`

  - Type: `boolean`
  - Default: `true`

  Whether to automatically load the LESS global style.

  `recursive`

  - Type: `boolean`
  - Default: `true`

  Whether to recursively search the global styles in the directory
