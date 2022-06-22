module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  env: {
    production: {
      plugins: ['transform-remove-console']
    }
  },
  plugins: [
    [
      'module-resolver',
      {
        root: ['./'],
        extensions: ['.ios.js', '.android.js', '.js', '.json', '.tsx', '.ts'],
        alias: {
          '@root': '.',
          '@assets': './assets',
          '@screens': './src/screens',
          '@src': './src',
          '@components': './src/components',
          '@themes': './src/themes',
          '@services': './src/services',
          '@utils': './src/utils',
          '@navigation': './src/navigation',
          '@hooks': './src/hooks'
        }
      }
    ],
    'react-native-reanimated/plugin'
  ]
};
