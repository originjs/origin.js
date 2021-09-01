import path from 'path'
import assets from '../src/index'

describe('assetsTest', () => {
  test('global css transform test', () => {
    const indexHtmlPath = path.resolve(__dirname, 'global_test_repo/index.html')
    // @ts-ignore
    const transformResult = assets.transformIndexHtml.transform('', {
      filename: indexHtmlPath,
    })

    expect(transformResult.length).toBe(2)

    expect(transformResult[0].tag).toBe('link')
    expect(transformResult[0].injectTo).toBe('head')
    expect(transformResult[0].attrs.rel).toBe('stylesheet')
    expect(transformResult[0].attrs.href).toBe('src/assets/global-a.css')

    expect(transformResult[1].tag).toBe('link')
    expect(transformResult[1].injectTo).toBe('head')
    expect(transformResult[1].attrs.rel).toBe('stylesheet')
    expect(transformResult[1].attrs.href).toBe('src/assets/global-abc.scss')
  })
})
