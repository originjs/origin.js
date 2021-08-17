import type { Config } from '@jest/types'

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  testMatch: ['<rootDir>/packages/**/__tests__/**/*.spec.[jt]s?(x)'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json'],
  transform: {
    '\\.(ts|tsx)$': 'ts-jest',
  },
  coverageDirectory: 'coverage',
  coverageReporters: ['html', 'lcov', 'text'],
  collectCoverageFrom: [
    'packages/*/src/**/*.ts',
    '!packages/runtime-test/src/utils/**',
  ],
}

export default config
