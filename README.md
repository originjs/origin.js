# Origin.js

<p align="center"><img align="center" style="width:240px" src="./.github/originjs.png"/></p><br/>
<p align="center">
  <a href="https://github.com/originjs/origin.js/actions/workflows/ci.yml"><img src="https://github.com/originjs/origin.js/actions/workflows/ci.yml/badge.svg?branch=main" alt="Build Status"></a>
  <a href="https://www.npmjs.com/package/@originjs/cli"><img src="https://badgen.net/npm/v/@originjs/cli" alt="Version"></a>
  <a href="https://nodejs.org/en/about/releases/"><img src="https://img.shields.io/node/v/vite.svg" alt="Node Compatibility"></a>
  <a href="https://www.npmjs.com/package/@originjs/cli"><img src="https://badgen.net/npm/license/origin.js" alt="License"></a>
 </p>

> A simple and powerful Vue.js web application framework that provides a complete set of web project solutions based on Vue.js.

## Features
- [Vue 3](https://github.com/vuejs/vue-next) & [Vite2](https://github.com/vitejs/vite)
- [Vue i18n](https://github.com/intlify/vue-i18n-next) & [Vuex](https://github.com/vuejs/vue-next) intergrated
- [Jest](https://jestjs.io/) or [Vitest](https://vitest.dev/) for Vue component testing
- Global styles with css, sass, less or stylus
- Auto-imported Vue components
- File based routing and layouts
- Open `yaml/xml/xlsx/...` as a ES module
- Markdown support
- [Webpack to vite conversion tool](https://github.com/originjs/webpack-to-vite)
- [A migration tool from Vue 2 to Vue 3](https://github.com/originjs/vue-codemod)

View [Documentation](https://originjs.github.io/docs/en/) for more information.

## Plugins
- GlobalStyle - [`@originjs/vite-plugin-global-style`](https://github.com/originjs/origin.js/tree/main/packages/vite-plugin-global-style)
- Layouts & Pages - [`@originjs/vite-plugin-pages`](https://github.com/originjs/origin.js/tree/main/packages/vite-plugin-pages)
- Components - [`vite-plugin-components`](https://github.com/antfu/vite-plugin-components)
- Markdown - [`vite-plugin-md`](https://github.com/antfu/vite-plugin-md)
- Content - [`@originjs/vite-plugin-content`](https://github.com/originjs/origin.js/tree/main/packages/vite-plugin-content)

## Installation
```shell
npm install -g @originjs/cli
```
or
```shell
yarn global add @originjs/cli
```

## Getting started
To create a new application with origin.js, just run:
```shell
ori init <app-name>
```

## Examples
- [Vue 3 project using origin.js plugins](https://github.com/originjs/origin.js/tree/main/examples/vue3)
- [Origin.js templates](https://github.com/konpeki622/origin-demo)
