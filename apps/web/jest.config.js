module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jest-environment-jsdom',
  cacheDirectory: '.tmp/jestCache',
  setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
  moduleNameMapper: {
    '@client/(.*)': '<rootDir>/src/client/$1',
    '@server/(.*)': '<rootDir>/src/server/$1',
    '@shared/(.*)': '<rootDir>/src/shared/$1',
    '@test/(.*)': '<rootDir>/test/$1',
    'src/(.*)': '<rootDir>/src/$1',
  },
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        tsconfig: '<rootDir>/tsconfig.test.json',
      },
    ],
    '.+\\.(css|styl|less|sass|scss)$': 'jest-css-modules-transform',
  },
}
