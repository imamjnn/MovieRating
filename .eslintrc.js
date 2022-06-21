module.exports = {
  root: true,
  extends: '@react-native-community',
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'prettier'],
  rules: {
    // eslint
    'comma-dangle': 'off',
    'no-empty-function': 'off',
    'eslint-comments/no-unused-disable': 'off',

    // eslint-plugin-prettier
    'prettier/prettier': 2,

    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': ['error']
  }
};
