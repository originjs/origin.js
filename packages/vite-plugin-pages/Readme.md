# vite-plugin-pages

Automate generate route config for Vue components in pages directory, and support layouts in the same time

## Features

- component which name starts with `_` is dynamic page
- component which name starts with `$` is nested route
- component which name is `_` will catch the error page
- default layout will be applied to every Vue component in pages direcotry
- custom layout will only be applied to Vue component has set layout property in layout block

## Install

```shell
npm install @originjs/vite-plugin-pages --save-dev
```

or

```shell
yarn add @originjs/vite-plugin-pages --dev
```

## Usage

First, add `@originjs/vite-plugin-pages` in `vite.config.js`.

```js
// vite.config.js
import pages from '@originjs/vite-plugin-pages'

export default {
    plugins: [
        pages(
            /* options */
        )
    ]
}
```

Then import the `routes` generated from vite-plugin-pages, and create `router` instance with the `routes`:

```js

import { createRouter, createWebHistory } from 'vue-router'
import routes from 'plugin-pages'

console.log(routes)

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
```

now we could write our pages and layouts in pages directory and layouts directory respectively.

## Convert rules

See these examples:

1. Normal file name: /user/foo.vue -> /user/foo
2. File name starts with `_`: /user/_id.vue -> /user/:id
3. File name is `index.vue`: /user/index.vue -> /user
4. File name is `_`: /_.vue -> /:pathMatch(.*)*

## Others

1. The name of files and directories in same directory must be different.
   For example, if we already have /user/, we can't add a `user.vue` file.
2. Directory can not be `index`
