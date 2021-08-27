import tomlTransform from '../src/tomlTransformation'
import { join } from 'path'
import fs from 'fs'
import { PluginOptions } from '../src'

describe('tomlTest', () => {
  test('include and exclude test', async () => {
    const options: PluginOptions = {
      toml: {
        enabled: true,
        include: /testInclude.toml/,
        exclude: /testExclude.toml/,
      },
    }

    let transformResult = tomlTransform(options, '', 'testExclude.toml')
    expect(transformResult).toBeNull()

    transformResult = tomlTransform(options, '', 'testFile.toml')
    expect(transformResult).toBeNull()

    transformResult = tomlTransform(options, '', 'testInclude.toml')
    expect(transformResult).not.toBeNull()
  })

  test('toml transform', async () => {
    const path: string = join(__dirname, './files/Cargo.toml')
    const tomlContent: string = fs.readFileSync(path).toString()
    const options: PluginOptions = { toml: { enabled: true } }
    const transformResult = tomlTransform(options, tomlContent, '')
    expect(transformResult!.code).toEqual(`var data = { "package":{ name:"thrift-test",
    version:"0.1.0",
    license:"Apache-2.0",
    authors:[ "Apache Thrift Developers <dev@thrift.apache.org>" ],
    publish:false },
  dependencies:{ clap:"2.33",
    env_logger:"0.4.0",
    log:"0.4",
    "ordered-float":"1.0",
    try_from:"0.3",
    thrift:{ path:"../../lib/rs" } } };
export default data;`)
  })
})
