import csvTransform from '../src/csvTransformation'
import { join } from 'path'
import fs from 'fs'
import { PluginOptions } from '../src'

describe('csvTest', () => {
  test('include and exclude test', async () => {
    const options: PluginOptions = {
      csv: {
        enabled: true,
        include: /testInclude.csv/,
        exclude: /testExclude.csv/,
      },
    }

    let transformResult = csvTransform(options, '', 'testExclude.csv')
    expect(transformResult).toBeNull()

    transformResult = csvTransform(options, '', 'testFile.csv')
    expect(transformResult).toBeNull()

    transformResult = csvTransform(options, '', 'testInclude.csv')
    expect(transformResult).not.toBeNull()
  })

  test('csv transform', async () => {
    const path: string = join(__dirname, './files/testCSV.csv')
    const csvContent: string = fs.readFileSync(path).toString()
    const options: PluginOptions = { csv: { enabled: true } }
    const transformResult = csvTransform(options, csvContent, '')
    expect(transformResult.code)
      .toEqual(`var data = [ [ "Sample CSV File - Numbers and their Squares",
    "",
    "" ],
  [ "",
    "",
    "" ],
  [ "",
    "",
    "" ],
  [ "",
    "Number",
    "Square" ],
  [ "",
    "",
    "" ],
  [ "",
    "1",
    "1" ],
  [ "",
    "2",
    "4" ],
  [ "",
    "3",
    "9" ],
  [ "",
    "4",
    "16" ],
  [ "",
    "5",
    "25" ],
  [ "",
    "6",
    "36" ],
  [ "",
    "7",
    "49" ],
  [ "",
    "8",
    "64" ],
  [ "",
    "9",
    "81" ],
  [ "",
    "10",
    "100" ],
  [ "",
    "11",
    "121" ],
  [ "",
    "12",
    "144" ],
  [ "",
    "13",
    "169" ],
  [ "",
    "14",
    "196" ],
  [ "",
    "15",
    "225" ],
  [ "",
    "",
    "" ],
  [ "Written and saved in Apache OpenOffice.\\n",
    "",
    "" ] ];
export default data;`)
  })
})
