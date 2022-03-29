import xlsxTransform from '../src/xlsxTransformation'
import { join } from 'path'
import fs from 'fs'
import { PluginOptions } from '../src'

describe('xlsxTest', () => {
  test('include and exclude test', async () => {
    let options: PluginOptions = {
      xlsx: {
        enabled: true,
        include: /testInclude.xlsx/,
        exclude: /testEXCEL.xlsx/,
      },
    }

    const path: string = join(__dirname, './files/testEXCEL.xlsx')
    let transformResult = xlsxTransform(options, '', path)
    expect(transformResult).toBeNull()

    transformResult = xlsxTransform(options, '', path)
    expect(transformResult).toBeNull()

    options = {
      xlsx: {
        enabled: true,
        include: /testEXCEL.xlsx/,
      },
    }
    transformResult = xlsxTransform(options, '', path)
    expect(transformResult).not.toBeNull()
  })

  test('xlsx transform', async () => {
    const path: string = join(__dirname, './files/testEXCEL.xlsx')
    const xlsxContent: string = fs.readFileSync(path).toString()
    const options: PluginOptions = { xlsx: { enabled: true } }
    const transformResult = xlsxTransform(options, xlsxContent, path)
    expect(transformResult!.code).toMatchSnapshot('A1')
  })
})
