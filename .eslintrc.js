// eslint-disable-next-line no-undef
module.exports = {
  root: true,
  env: {
    browser: true,
    es2020: true
  },
  extends: 'eslint:recommended',
  parserOptions: {
    sourceType: 'module',
    "ecmaVersion": 2020
  },
  rules: {
    semi: [
      2,
      'always'
    ]
  }
};
