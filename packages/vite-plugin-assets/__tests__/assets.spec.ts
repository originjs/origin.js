import path from 'path'
import assets from '../src/index'

describe('assetsTest', () => {
  test('global css depth transform test', () => {
    const indexHtmlPath = path.resolve(__dirname, 'global_test_repo/index.html')
    // @ts-ignore
    const transformResult = assets().transformIndexHtml.transform('', {
      filename: indexHtmlPath,
    })

    expect(transformResult.length).toBe(4)

    expect(transformResult[0].tag).toBe('link')
    expect(transformResult[0].injectTo).toBe('head')
    expect(transformResult[0].attrs.rel).toBe('stylesheet')
    expect(transformResult[0].attrs.href).toBe('/src/assets/abc/global-d.css')

    expect(transformResult[1].tag).toBe('link')
    expect(transformResult[1].injectTo).toBe('head')
    expect(transformResult[1].attrs.rel).toBe('stylesheet')
    expect(transformResult[1].attrs.href).toBe('/src/assets/global-a.css')

    expect(transformResult[2].tag).toBe('link')
    expect(transformResult[2].injectTo).toBe('head')
    expect(transformResult[2].attrs.rel).toBe('stylesheet')
    expect(transformResult[2].attrs.href).toBe('/src/assets/global-b.scss')

    expect(transformResult[3].tag).toBe('link')
    expect(transformResult[3].injectTo).toBe('head')
    expect(transformResult[3].attrs.rel).toBe('stylesheet')
    expect(transformResult[3].attrs.href).toBe('/src/assets/global-c.less')
  })

  test('global css shallow transform test', () => {
    const indexHtmlPath = path.resolve(__dirname, 'global_test_repo/index.html')
    // @ts-ignore
    const transformResult = assets( { recursive: false } ).transformIndexHtml.transform('', {
      filename: indexHtmlPath,
    })

    expect(transformResult.length).toBe(3)

    expect(transformResult[0].tag).toBe('link')
    expect(transformResult[0].injectTo).toBe('head')
    expect(transformResult[0].attrs.rel).toBe('stylesheet')
    expect(transformResult[0].attrs.href).toBe('/src/assets/global-a.css')

    expect(transformResult[1].tag).toBe('link')
    expect(transformResult[1].injectTo).toBe('head')
    expect(transformResult[1].attrs.rel).toBe('stylesheet')
    expect(transformResult[1].attrs.href).toBe('/src/assets/global-b.scss')

    expect(transformResult[2].tag).toBe('link')
    expect(transformResult[2].injectTo).toBe('head')
    expect(transformResult[2].attrs.rel).toBe('stylesheet')
    expect(transformResult[2].attrs.href).toBe('/src/assets/global-c.less')
  })

  test('global css Config directory transform test', () => {
    const indexHtmlPath = path.resolve(__dirname, 'global_test_repo/index.html')
    // @ts-ignore
    const transformResult = assets( { sourcePath: 'src/stylesheets' } ).transformIndexHtml.transform('', {
      filename: indexHtmlPath,
    })

    expect(transformResult.length).toBe(3)

    expect(transformResult[0].tag).toBe('link')
    expect(transformResult[0].injectTo).toBe('head')
    expect(transformResult[0].attrs.rel).toBe('stylesheet')
    expect(transformResult[0].attrs.href).toBe('/src/stylesheets/global-e.css')

    expect(transformResult[1].tag).toBe('link')
    expect(transformResult[1].injectTo).toBe('head')
    expect(transformResult[1].attrs.rel).toBe('stylesheet')
    expect(transformResult[1].attrs.href).toBe('/src/stylesheets/global-f.scss')

    expect(transformResult[2].tag).toBe('link')
    expect(transformResult[2].injectTo).toBe('head')
    expect(transformResult[2].attrs.rel).toBe('stylesheet')
    expect(transformResult[2].attrs.href).toBe('/src/stylesheets/global-g.less')
  })
})
