import propertiesTransform from '../src/propertiesTransformation'
import { join } from 'path'
import fs from 'fs'
import { PluginOptions } from '../src'

describe('propertiesTest', () => {
  test('include and exclude test', async () => {
    const options: PluginOptions = {
      properties: {
        enabled: true,
        include: /testInclude.properties/,
        exclude: /testExclude.properties/,
      },
    }

    let transformResult = propertiesTransform(
      options,
      '',
      'testExclude.properties',
    )
    expect(transformResult).toBeNull()

    transformResult = propertiesTransform(options, '', 'testFile.properties')
    expect(transformResult).toBeNull()

    transformResult = propertiesTransform(options, '', 'testInclude.properties')
    expect(transformResult).not.toBeNull()
  })

  test('properties transform', async () => {
    const path: string = join(__dirname, './files/test.properties')
    const propertiesContent: string = fs.readFileSync(path).toString()
    const options: PluginOptions = { properties: { enabled: true } }
    const transformResult = propertiesTransform(options, propertiesContent, '')
    expect(transformResult!.code)
      .toEqual(`var data = { languages:"be,ca,da,de,eo,et,el,en,es,fi,fr,fa,gl,hu,is,it,lt,nl,no,pl,pt,ro,ru,sk,sl,sv,th,uk",
  "name.be":"Belarusian",
  "name.ca":"Catalan",
  "name.da":"Danish",
  "name.de":"German",
  "name.eo":"Esperanto",
  "name.et":"Estonian",
  "name.el":"Greek",
  "name.en":"English",
  "name.es":"Spanish",
  "name.fi":"Finnish",
  "name.fr":"French",
  "name.fa":"Persian",
  "name.gl":"Galician",
  "name.hu":"Hungarian",
  "name.is":"Icelandic",
  "name.it":"Italian",
  "name.lt":"Lithuanian",
  "name.nl":"Dutch",
  "name.no":"Norwegian",
  "name.pl":"Polish",
  "name.pt":"Portuguese",
  "name.ro":"Romanian",
  "name.ru":"Russian",
  "name.sk":"Slovakian",
  "name.sl":"Slovenian",
  "name.sv":"Swedish",
  "name.th":"Thai",
  "name.uk":"Ukrainian" };
export default data;`)
  })
})
