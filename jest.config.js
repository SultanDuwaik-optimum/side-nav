module.exports = {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
  transformIgnorePatterns: ['node_modules/(?!.*\\.mjs$)'],
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/src/$1',
    '^@app/(.*)$': '<rootDir>/src/app/$1',
  },
  transform: {
    '^.+\\.(ts|js|html|svg)$': 'jest-preset-angular',
  },
  collectCoverage: true,
  coverageReporters: ['html', 'lcov', 'text-summary'],
};