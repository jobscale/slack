module.exports = {
  extends: 'airbnb-base',
  globals: {
  },
  rules: {
    indent: ['error', 2, { MemberExpression: 0 }],
    'no-trailing-spaces': 'error',
    'arrow-parens': 'off',
    'no-param-reassign': 'off',
    'arrow-body-style': 'off',
    'class-methods-use-this': 'off',
    'no-await-in-loop': 'off',
    'no-plusplus': 'off',
    'no-loop-func': 'off',
  },
  env: {
    node: true,
    'jest/globals': true,
  },
  parserOptions: {
    ecmaVersion: 2023,
  },
  plugins: [
    'jest',
  ],
};
