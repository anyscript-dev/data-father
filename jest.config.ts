import type { Config } from '@jest/types'

const config: Config.InitialOptions = {
  testMatch: ['**/?(*.)+(spec|test).[jt]s?(x)'],
  transform: {
    '^.+\\.(t|j)sx?$': require.resolve('ts-jest'),
  },
  moduleNameMapper: {
    '^.+\\.(css|less|sass|scss|stylus)$': require.resolve('identity-obj-proxy'),
  },
  testTimeout: 30000,
  testEnvironment: 'jsdom',
  modulePathIgnorePatterns: ['<rootDir>/packages/.+/dist'],
  transformIgnorePatterns: ['/node_modules/'],
  coverageReporters: ['json', 'lcov', 'text', 'text-summary'],
  setupFilesAfterEnv: ['<rootDir>/scripts/internal/jestSetup.js'],
}

export default config
