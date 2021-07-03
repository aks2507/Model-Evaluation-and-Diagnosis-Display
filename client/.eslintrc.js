module.exports = {
  settings: {
    react: {
      version: 'detect',
    },
  },
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  rules: {
    quotes: [2, 'single', { avoidEscape: true }],
  },
  plugins: ['react'],
  parser: 'babel-eslint',
};
