import plistTransform from '../src/plistTransformation'
import { join } from 'path'
import fs from 'fs'
import { PluginOptions } from '../src'

describe('plistTest', () => {
  test('include and exclude test', async () => {
    const options: PluginOptions = {
      plist: {
        enabled: true,
        include: /testInclude.plist/,
        exclude: /testExclude.plist/,
      },
    }

    let transformResult = plistTransform(options, '', 'testExclude.plist')
    expect(transformResult).toBeNull()

    transformResult = plistTransform(options, '', 'testFile.plist')
    expect(transformResult).toBeNull()
  })

  test('plist transform', async () => {
    const path: string = join(__dirname, './files/Info.plist')
    const plistContent: string = fs.readFileSync(path).toString()
    const options: PluginOptions = { plist: { enabled: true } }
    const transformResult = plistTransform(options, plistContent, '')
    expect(transformResult!.code).toEqual(`var data = { BuildMachineOSBuild:"16E195",
  CFBundleDevelopmentRegion:"en",
  CFBundleExecutable:"terminal-notifier",
  CFBundleIconFile:"Terminal",
  CFBundleIdentifier:"nl.superalloy.oss.terminal-notifier",
  CFBundleInfoDictionaryVersion:"6.0",
  CFBundleName:"terminal-notifier",
  CFBundlePackageType:"APPL",
  CFBundleShortVersionString:"1.7.2",
  CFBundleSignature:"????",
  CFBundleSupportedPlatforms:[ "MacOSX" ],
  CFBundleVersion:"17",
  DTCompiler:"com.apple.compilers.llvm.clang.1_0",
  DTPlatformBuild:"8B62",
  DTPlatformVersion:"GM",
  DTSDKBuild:"16B2649",
  DTSDKName:"macosx10.12",
  DTXcode:"0810",
  DTXcodeBuild:"8B62",
  LSMinimumSystemVersion:"10.8",
  LSUIElement:true,
  NSAppTransportSecurity:{ NSAllowsArbitraryLoads:true },
  NSHumanReadableCopyright:"Copyright © 2012-2016 Eloy Durán, Julien Blanchard. All rights reserved.",
  NSMainNibFile:"MainMenu",
  NSPrincipalClass:"NSApplication",
  NSUserNotificationAlertStyle:"alert" };
export default data;`)
  })
})
