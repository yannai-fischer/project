// eslint-disable-next-line no-undef
module.exports = {
  root: true,
  env: {
    browser: true,
    es2020: true
  },
  extends: 'eslint:recommended',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module'
  },
  parser: "@babel/eslint-parser",
  rules: {
    semi: [
      2,
      'always'
    ]
  }
};
