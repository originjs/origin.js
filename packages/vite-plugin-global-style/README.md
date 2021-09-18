# vite-plugin-global-style
`CSS`, `SASS`, `LESS`, `Stylus` files named starting with `global` are automatically added to the vite global style.<br/>
For global `CSS` styles, they will be added to the `index.html` and will affect all pages.<br/>
For global `SASS`/`LESS`/`Stylus` styles, they will be added to every `SASS`/`LESS` files using `@import XXXX`.

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

  The relative path of the directory in which to search for global styles.

- `cssEnabled`

  - Type: `boolean`
  - Default: `true`

  Whether to automatically load the `CSS` global styles.

- `sassEnabled`

  - Type: `boolean`
  - Default: `true`

  Whether to automatically load the `SASS` global styles.

- `lessEnabled`

  - Type: `boolean`
  - Default: `true`

  Whether to automatically load the `LESS` global styles.

- `stylusEnabled`

  - Type: `boolean`
  - Default: `true`

  Whether to automatically load the `Stylus` global styles.

- `recursive`

  - Type: `boolean`
  - Default: `true`

  Whether to recursively search the global styles in the `sourcePath` directory.
