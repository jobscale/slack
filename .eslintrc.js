module.exports = {
  extends: 'airbnb-base',
  globals: {
    fetch: 'readonly',
  },
  rules: {
    indent: ['error', 2, { MemberExpression: 0 }],
    'arrow-parens': 'off',
    'no-param-reassign': 'off',
    'arrow-body-style': 'off',
    'class-methods-use-this': 'off',
    'no-await-in-loop': 'off',
    'no-plusplus': 'off',
    'no-loop-func': 'off',
  },
  env: {
    'jest/globals': true,
  },
  plugins: [
    'jest',
  ],
};
