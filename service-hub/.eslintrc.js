module.exports = {
  parser: '@babel/eslint-parser',
  extends: ['airbnb', 'prettier', 'plugin:prettier/recommended'],
  plugins: ['react', 'jsx-a11y', 'import', 'prettier'],
  rules: {
    'prettier/prettier': 'error',
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'react/prop-types': 0,
    // Add more custom rules as needed
  },
  env: {
    browser: true,
    node: true,
    es6: true,
  },
};
