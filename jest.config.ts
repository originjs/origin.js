// eslint-disable-next-line node/no-extraneous-import
import type { Config } from '@jest/types'

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  testMatch: ['<rootDir>/packages/**/__tests__/**/*.spec.[jt]s?(x)'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json'],
}

export default config
