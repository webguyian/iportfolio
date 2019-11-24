module.exports = {
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest'
  },
  modulePaths: ['<rootDir>/src'],
  testPathIgnorePatterns: ['/node_modules/', '<rootDir>/(config|public)/'],
  testRegex: '((\\.|/)(test|spec))\\.jsx?$',
  coverageThreshold: {
    global: {
      branches: 60,
      functions: 60,
      lines: 60,
      statements: 60
    }
  },
  collectCoverage: true,
  collectCoverageFrom: ['**/*.*', '!**/**/*.json'],
  coveragePathIgnorePatterns: [
    '/node_modules/',
    './api',
    './config',
    './coverage',
    './dist',
    '.eslintrc.js',
    'babel.config.js',
    'jest.config.js',
    '<rootDir>/src/index.js',
    '<rootDir>/src/pages',
    '_snapshots_'
  ],
  coverageReporters: ['html']
};
