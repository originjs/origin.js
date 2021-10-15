# Origin.js

<p align="center"><img align="center" style="width:320px" src="./.github/originjs.png"/></p><br/>
<p align="center">
  <a href="https://github.com/originjs/origin.js/actions/workflows/ci.yml"><img src="https://github.com/originjs/origin.js/actions/workflows/ci.yml/badge.svg?branch=main" alt="Build Status"></a>
  <a href="https://www.npmjs.com/package/origin.js"><img src="https://badgen.net/npm/v/origin.js" alt="Version"></a>
  <a href="https://nodejs.org/en/about/releases/"><img src="https://img.shields.io/node/v/vite.svg" alt="Node Compatibility"></a>
  <a href="https://www.npmjs.com/package/origin.js"><img src="https://badgen.net/npm/license/origin.js" alt="License"></a>
 </p>

> A simple and powerful Vue.js web application framework that provides a complete set of web project solutions based on Vue.js

## Features
- Vue 3, Vite 2
- Vuex, Vue I18n
- Global styles with css, sass, less or stylus
- Auto-registered components
- Route config generated for Vue components
- Layout system
- Files conversion includes `*.yaml`, `*.xml`, `*.xlsx`, `*.ini`, `*.toml`, `*.csv`, `*.plist` and `*.properties`
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

## Install
```shell
npm install @originjs/cli -g
```

## Getting started
To create a new application with originjs, just run:
```shell
ori init <app-name>
```

## Usage
### init
```shell
ori init [options] <app-name>
```
#### Options
```
-d, --default      skip init project options
-a, --all-plugins  create project with all plugins
-u, --uninstalled  skip install denpendencies
-h, --help         display help for command"
```

### development
```shell
npm run dev
```
or
```shell
ori dev
```

### build
```shell
npm run build
```
or
```shell
ori build
```

### help and more
```
ori help [command]
```