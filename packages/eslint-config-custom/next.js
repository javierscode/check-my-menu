module.exports = {
    parserOptions: {
      ecmaFeatures: {
        jsx: true,
      },
      ecmaVersion: 12,
      sourceType: 'module',
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    extends: [
      'turbo',
      'next',
      'plugin:react/recommended',
      'plugin:react/jsx-runtime',
      'plugin:react-hooks/recommended',
      './index.js',
    ],
    plugins: ['react'],
  }
  