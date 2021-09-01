# vite-plugin-assets
`CSS`, `SASS`, `LESS` files named starting with `global-` are automatically added to the vite global style

## Install
```shell
npm install @originjs/vite-plugin-assets --save-dev
```
or
```shell
yarn add @originjs/vite-plugin-assets --dev
```

## Usage
add `@originjs/vite-plugin-assets` in `vite.config.js`.
```js
import assets from '@originjs/vite-plugin-assets'

export default {
    plugins: [
        assets(
            /* options */
        )
    ]
}
```

### Options
- `sourcePath` 

  - Type: `string`
  - Default: `/src/assets`

  The relative path of the assets directory to the project.

- `cssEnabled`

  - Type: `boolean`
  - Default: `true`

  Whether to automatically load the CSS global style.

- `sassEnabled`

  - Type: `boolean`
  - Default: `true`

  Whether to automatically load the CSS global style.

- `lessEnabled`

  - Type: `boolean`
  - Default: `true`

  Whether to automatically load the CSS global style.
