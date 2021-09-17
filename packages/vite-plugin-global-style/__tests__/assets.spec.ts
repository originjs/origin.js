import path from 'path'
import assets from '../src/index'

describe('assetsTest', () => {
  test('global css depth transform test', () => {
    const indexHtmlPath = path.resolve(__dirname, 'global_test_repo/index.html')
    // @ts-ignore
    const transformResult = assets().transformIndexHtml.transform('', {
      filename: indexHtmlPath,
    })

    expect(transformResult.length).toBe(2)

    expect(transformResult[0].tag).toBe('link')
    expect(transformResult[0].injectTo).toBe('head')
    expect(transformResult[0].attrs.rel).toBe('stylesheet')
    expect(transformResult[0].attrs.href).toBe('/src/assets/deep/global-test.css')

    expect(transformResult[1].tag).toBe('link')
    expect(transformResult[1].injectTo).toBe('head')
    expect(transformResult[1].attrs.rel).toBe('stylesheet')
    expect(transformResult[1].attrs.href).toBe('/src/assets/global-test.css')
  })

  test('global css shallow transform test', () => {
    const indexHtmlPath = path.resolve(__dirname, 'global_test_repo/index.html')
    // @ts-ignore
    const transformResult = assets( { recursive: false } ).transformIndexHtml.transform('', {
      filename: indexHtmlPath,
    })

    expect(transformResult.length).toBe(1)

    expect(transformResult[0].tag).toBe('link')
    expect(transformResult[0].injectTo).toBe('head')
    expect(transformResult[0].attrs.rel).toBe('stylesheet')
    expect(transformResult[0].attrs.href).toBe('/src/assets/global-test.css')
  })

  test('global css Config directory transform test', () => {
    const indexHtmlPath = path.resolve(__dirname, 'global_test_repo/index.html')
    // @ts-ignore
    const transformResult = assets( { sourcePath: 'src/stylesheets' } ).transformIndexHtml.transform('', {
      filename: indexHtmlPath,
    })

    expect(transformResult.length).toBe(1)

    expect(transformResult[0].tag).toBe('link')
    expect(transformResult[0].injectTo).toBe('head')
    expect(transformResult[0].attrs.rel).toBe('stylesheet')
    expect(transformResult[0].attrs.href).toBe('/src/stylesheets/global-test.css')
  })

  test('global sass transform test', () => {
    const indexHtmlPath = path.resolve(__dirname, 'global_test_repo/index.html')
    const plugin = assets()
    // @ts-ignore
    plugin.transformIndexHtml.transform('', {
      filename: indexHtmlPath,
    })
    const id = path.resolve(__dirname, 'global_test_repo/src/assets/test.scss')
    // @ts-ignore
    const transformResult = plugin.transform('', id).code.trim()

    expect(transformResult).toBe(`@import "global-test1.scss"; @import "global-test2.scss";`)
  })

  test('global less transform test', () => {
    const indexHtmlPath = path.resolve(__dirname, 'global_test_repo/index.html')
    const plugin = assets()
    // @ts-ignore
    plugin.transformIndexHtml.transform('', {
      filename: indexHtmlPath,
    })
    const id = path.resolve(__dirname, 'global_test_repo/src/assets/test.less')
    // @ts-ignore
    const transformResult = plugin.transform('', id).code.trim()

    expect(transformResult).toBe(`@import "global-test1.less"; @import "global-test2.less";`)
  })
})
