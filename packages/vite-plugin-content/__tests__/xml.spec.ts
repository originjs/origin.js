import xmlTransform from '../src/xmlTransformation'
import { join } from 'path'
import fs from 'fs'
import { PluginOptions } from '../src'

describe('xmlTest', () => {
  test('include and exclude test', async () => {
    const options: PluginOptions = {
      xml: {
        enabled: true,
        include: /testInclude.xml/,
        exclude: /testExclude.xml/,
      },
    }

    let transformResult = xmlTransform(options, '', 'testExclude.xml')
    expect(transformResult).toBeNull()

    transformResult = xmlTransform(options, '', 'testFile.xml')
    expect(transformResult).toBeNull()

    transformResult = xmlTransform(options, '', 'testInclude.xml')
    expect(transformResult).not.toBeNull()
  })

  test('xml transform', async () => {
    const path: string = join(__dirname, './files/site.xml')
    const xmlContent: string = fs.readFileSync(path).toString()
    const options: PluginOptions = { xml: { enabled: true } }
    const transformResult = xmlTransform(options, xmlContent, '')
    expect(transformResult!.code)
      .toEqual(`var data = { project:{ $:{ name:"Commons Compress" },
    bannerRight:[ { name:[ "Commons Compress" ],
        src:[ "/images/compress-logo-white.png" ],
        href:[ "/index.html" ] } ],
    body:[ { menu:[ { $:{ name:"Compress" },
            item:[ { $:{ name:"Overview",
                  href:"/index.html" } },
              { $:{ name:"User Guide",
                  href:"/examples.html" } },
              { $:{ name:"Known Limitations",
                  href:"/limitations.html" } },
              { $:{ name:"Conventions",
                  href:"/conventions.html" } },
              { $:{ name:"Issue Tracking",
                  href:"/issue-tracking.html" } },
              { $:{ name:"Download",
                  href:"/download_compress.cgi" } },
              { $:{ name:"Security Reports",
                  href:"/security-reports.html" } },
              { $:{ name:"Wiki",
                  href:"https://wiki.apache.org/commons/Compress" } } ] },
          { $:{ name:"API Docs" },
            item:[ { $:{ name:"Latest release",
                  href:"javadocs/api-release/index.html" } },
              { $:{ name:"1.21",
                  href:"javadocs/api-1.21/index.html" } },
              { $:{ name:"1.20",
                  href:"javadocs/api-1.20/index.html" } },
              { $:{ name:"1.19",
                  href:"javadocs/api-1.19/index.html" } },
              { $:{ name:"1.18",
                  href:"javadocs/api-1.18/index.html" } },
              { $:{ name:"1.17",
                  href:"javadocs/api-1.17/index.html" } },
              { $:{ name:"1.16.1",
                  href:"javadocs/api-1.16.1/index.html" } },
              { $:{ name:"1.16",
                  href:"javadocs/api-1.16/index.html" } },
              { $:{ name:"1.15",
                  href:"javadocs/api-1.15/index.html" } },
              { $:{ name:"1.14",
                  href:"javadocs/api-1.14/index.html" } },
              { $:{ name:"1.13",
                  href:"javadocs/api-1.13/index.html" } },
              { $:{ name:"1.12",
                  href:"javadocs/api-1.12/index.html" } },
              { $:{ name:"1.11",
                  href:"javadocs/api-1.11/index.html" } },
              { $:{ name:"1.10",
                  href:"javadocs/api-1.10/index.html" } },
              { $:{ name:"1.9",
                  href:"javadocs/api-1.9/index.html" } },
              { $:{ name:"1.8.1",
                  href:"javadocs/api-1.8.1/index.html" } },
              { $:{ name:"1.8",
                  href:"javadocs/api-1.8/index.html" } },
              { $:{ name:"1.7",
                  href:"javadocs/api-1.7/index.html" } },
              { $:{ name:"1.6",
                  href:"javadocs/api-1.6/index.html" } },
              { $:{ name:"GIT latest",
                  href:"apidocs/index.html" } } ] } ] } ] } };
export default data;`)
  })
})
