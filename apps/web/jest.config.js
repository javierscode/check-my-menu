module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  cacheDirectory: '.tmp/jestCache',
  moduleNameMapper: {
    '@client/(.*)': '<rootDir>/src/client/$1',
    '@server/(.*)': '<rootDir>/src/server/$1',
    '@shared/(.*)': '<rootDir>/src/shared/$1',
    '@test/(.*)': '<rootDir>/test/$1',
    'src/(.*)': '<rootDir>/src/$1',
  },
}
