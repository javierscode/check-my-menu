module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  cacheDirectory: '.tmp/jestCache',
  moduleNameMapper: {
    '@application/(.*)': '<rootDir>/src/application/$1',
    '@domain/(.*)': '<rootDir>/src/domain/$1',
    '@infrastructure/(.*)': '<rootDir>/src/infrastructure/$1',
    '@test/(.*)': '<rootDir>/test/$1',
  },
}
