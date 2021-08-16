import type { InlineConfig } from 'vite'
import { BuildPrinter, DevPrinter } from '../src/Printer'
import { join } from 'path'

describe('get config', () => {
  test('get build config', () => {
    const path = join(__dirname, './file/noneconfig')
    const print = new BuildPrinter(path)

    const buildConfig: InlineConfig = {
      configFile: false,
      build: { outDir: 'dist', assetsDir: 'public' },
      css: { postcss: { plugins: [] } },
      mode: 'production',
      publicDir: 'public',
      root: path,
      resolve: {
        extensions: [
          '.js',
          '.mjs',
          '.ts',
          '.jsx',
          '.tsx',
          '.json',
          '.yaml',
          '.yml',
        ],
      },
    }

    expect(print.getSchema()).toEqual(buildConfig)
  })

  test('get dev config', () => {
    const path = join(__dirname, './file/noneconfig')
    const print = new DevPrinter(path)

    const serveConfig: InlineConfig = {
      configFile: false,
      server: { host: '0.0.0.0', port: 3000, open: true, cors: true },
      build: { outDir: 'dist', assetsDir: 'public' },
      css: { postcss: { plugins: [] } },
      mode: 'development',
      publicDir: 'public',
      root: path,
      resolve: {
        extensions: [
          '.js',
          '.mjs',
          '.ts',
          '.jsx',
          '.tsx',
          '.json',
          '.yaml',
          '.yml',
        ],
      },
    }

    expect(print.getSchema()).toEqual(serveConfig)
  })

  //bug
  test('get build config with local config', () => {
    const path = join(__dirname, './file/withconfig')
    const print = new BuildPrinter(path)

    const buildConfig: InlineConfig = {
      configFile: false,
      server: { host: '0.0.0.0', port: 3000, open: true, cors: true },
      build: { outDir: 'dist', assetsDir: 'public' },
      css: { postcss: { plugins: [] } },
      mode: 'production',
      publicDir: 'public',
      root: path,
      resolve: {
        extensions: [
          '.js',
          '.mjs',
          '.ts',
          '.jsx',
          '.tsx',
          '.json',
          '.yaml',
          '.yml',
        ],
      },
    }

    console.log(print.getSchema())

    expect(print.getSchema()).toEqual(buildConfig)
  })
  test('get dev config with local config', () => {
    const path = join(__dirname, './file/withconfig')
    const print = new DevPrinter(path)

    const serveConfig: InlineConfig = {
      configFile: false,
      server: { host: '0.0.0.0', port: 3000, open: true, cors: true },
      build: { outDir: 'dist', assetsDir: 'public' },
      css: { postcss: { plugins: [] } },
      mode: 'development',
      publicDir: 'public',
      root: path,
      resolve: {
        extensions: [
          '.js',
          '.mjs',
          '.ts',
          '.jsx',
          '.tsx',
          '.json',
          '.yaml',
          '.yml',
        ],
      },
    }
    console.log(print.getSchema())
    expect(print.getSchema()).toEqual(serveConfig)
  })
})
