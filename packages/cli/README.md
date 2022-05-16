# Origin.js

<p align="center"><img align="center" style="width:240px" src="./oriTemplate/src/assets/originjs.png"/></p><br/>

<p align="center">
  <a href="https://github.com/originjs/origin.js/actions/workflows/ci.yml"><img src="https://github.com/originjs/origin.js/actions/workflows/ci.yml/badge.svg?branch=main" alt="Build Status"></a>
  <a href="https://www.npmjs.com/package/@originjs/cli"><img src="https://badgen.net/npm/v/@originjs/cli" alt="Version"></a>
  <a href="https://www.npmjs.com/package/@originjs/cli"><img src="https://badgen.net/npm/license/@originjs/cli" alt="License"></a>
</p>

> CLI for origin.js.

## Installation

```shell
npm install -g @originjs/cli
```
or
```shell
yarn global add @originjs/cli
```

## Features

### init

Create a `Vue3 & Vite` project that support : 
- A Vue framework built with [Vue 3](https://github.com/vuejs/vue-next) & [Vite2](https://github.com/vitejs/vite)
- [Vue i18n](https://kazupon.github.io/vue-i18n/) intergrated
- [Pinia](https://pinia.vuejs.org/) or [Vuex](https://vuex.vuejs.org/) for Vue store
- [Jest](https://jestjs.io/) or [Vitest](https://vitest.dev/) for Vue component testing
- [File based routing and layouts](https://github.com/originjs/origin.js/tree/main/packages/vite-plugin-pages)
- [Markdown support](https://github.com/antfu/vite-plugin-md)
- [Global css/sass/less/stylus support](https://github.com/originjs/origin.js/tree/main/packages/vite-plugin-global-style)
- [Open yaml/xml/xlsx/... as a ES module](https://github.com/originjs/origin.js/tree/main/packages/vite-plugin-content)
- [Auto-imported Vue components](https://github.com/antfu/unplugin-vue-components)
- [Host or remote project for module federation](https://github.com/originjs/vite-plugin-federation)
- [Webpack to vite conversion tool](https://github.com/originjs/webpack-to-vite)
- [A migration tool from Vue 2 to Vue 3](https://github.com/originjs/vue-codemod)
- TypeScript support

### setup
Constuct project for development and production.<br/>
> Supported by [@originjs/cli-service](https://github.com/originjs/origin.js/tree/main/packages/cli-service)

### tovite

Convert a webpack/vue-cli project to a vite project.<br/>
> Supported by [@originjs/webpack-to-vite](https://github.com/originjs/webpack-to-vite).

### tovue3

Upgrade a Vue 2 project to Vue 3.<br/>
> Supported by [@originjs/vue-codemod](https://github.com/originjs/vue-codemod).

## Usage

```shell
Usage: ori <command> [options]

Options:
  -v, --version              display version number
  -h, --help                 display help for command

Commands:
  init [options] <app-name>  init a new project
  dev [options]              alias of "ori dev" in the current project
  build                      alias of "ori build" in the current project
  tovite [options]           use vite in the current project
  tovue3 [options]           use vue-next in the current project
  help [command]             display help for command
```
