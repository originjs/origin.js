import path from 'path'
import assets from '../src/index'

describe('assetsTest', () => {
  test('global css transform test', () => {
    const indexHtmlPath = path.resolve('../global_test_repo/index.html')
    const transformPromist = assets.default().transformIndexHtml.transform(_, {
      filename: indexHtmlPath,
    })

    transformPromist.then(data => {
      console.log(data)
    })
  })
})
