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

### Init

Create a `Vue3 & Vite` project that support : 
- A Vue framework built with [Vue 3](https://github.com/vuejs/vue-next) & [Vite2](https://github.com/vitejs/vite)
- [File based routing and layouts](https://github.com/originjs/origin.js/tree/main/packages/vite-plugin-pages)
- [Markdown support](https://github.com/antfu/vite-plugin-md)
- [Global css/sass/less/stylus support](https://github.com/originjs/origin.js/tree/main/packages/vite-plugin-global-style)
- [Open yaml/xml/xlsx/... as a ES module](https://github.com/originjs/origin.js/tree/main/packages/vite-plugin-content)
- [Auto-imported Vue components](https://github.com/antfu/unplugin-vue-components)
- [Vue i18n](https://github.com/intlify/vue-i18n-next) & [Vuex](https://github.com/vuejs/vue-next) intergrated
- TypeScript support

### tovite

Convert a webpack/vue-cli project to a vite project.<br/>
> Supported by [webpack-to-vite](https://github.com/originjs/webpack-to-vite).

### tovue3

Upgrade a Vue 2 project to Vue 3.<br/>
> Supported by [vue-codemod](https://github.com/originjs/vue-codemod).

## Usage

```shell
ori --help  # show help

init [options] <app-name> # init a new project

dev [options] # alias of "ori dev" in the current project

build # alias of "ori build" in the current project

tovite [options] # use vite in the current project

tovue3 [options] # use vue-next in the current project

help [command] # display help for command
```
