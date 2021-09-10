import type { InlineConfig } from 'vite'
import { BuildPrinter, DevPrinter } from '../src/Printer'
import Path, { join } from 'path'

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

  test('get build config with local config', async () => {
    const path = join(__dirname, './file/withconfig')
    const print = new BuildPrinter(path)
    // The esm module cannot run correctly in jest, use import mock to read operations
    print.localConfig = (await import(`${path}/vite.config.ts`)).default
    const buildConfig: any = {
      build: {},
      configFile: false,
      css: { postcss: { plugins: [] } },
      mode: 'production',
      publicDir: 'public',
      root: path,
      resolve: {
        root: '/a/b',
        cacheDir: 'node_modules/.vite',
        alias: [
          {
            find: /^~/,
            replacement: '',
          },
          {
            find: '@',
            replacement: Path.resolve(path, 'src'),
          },
        ],
        extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue'],
      },
    }

    expect(print.getSchema()).toEqual(buildConfig)
  })

  test('get dev config with local config', async () => {
    const path = join(__dirname, './file/withconfig')
    const print = new DevPrinter(path)
    // The esm module cannot run correctly in jest, use import mock to read operations
    print.localConfig = (await import(`${path}/vite.config.ts`)).default
    const serveConfig: any = {
      configFile: false,
      server: {
        host: '0.0.0.0',
        port: 3000,
        open: true,
        cors: true,
      },
      build: {},
      css: { postcss: { plugins: [] } },
      mode: 'development',
      publicDir: 'public',
      root: path,
      resolve: {
        root: '/a/b',
        cacheDir: 'node_modules/.vite',
        alias: [
          {
            find: /^~/,
            replacement: '',
          },
          {
            find: '@',
            replacement: Path.resolve(path, 'src'),
          },
        ],
        extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue'],
      },
    }
    expect(print.getSchema()).toEqual(serveConfig)
  })
})
