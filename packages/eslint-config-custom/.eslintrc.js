module.exports = {
    env: {
      browser: true,
      es2021: true,
      node: true,
      'jest/globals': true,
    },
    parser: '@babel/eslint-parser',
    parserOptions: {
      requireConfigFile: false,
    },
    extends: ['eslint:recommended', 'standard', 'plugin:prettier/recommended'],
    plugins: ['simple-import-sort', 'import', 'unused-imports', 'jest'],
    rules: {
      'prettier/prettier': [
        'error',
        {
          printWidth: 100,
          semi: false,
          singleQuote: true,
          jsxSingleQuote: true,
          arrowParens: 'avoid',
        },
      ],
      'simple-import-sort/exports': 'error',
      'simple-import-sort/imports': 'error',
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_',
        },
      ],
    },
  }
  