module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./src'],
          extensions: [
            '.js',
            '.jsx',
            '.ts',
            '.tsx',
            '.json'
          ],
          alias: {
            '@': './src',
            '@components': './src/components',
            '@pages': './src/pages',
            '@lib': './src/lib',
            '@assets': './assets',
            '@data': './src/data'
          }
        }
      ],
      'react-native-reanimated/plugin' // Keep at end if using Reanimated
    ]
  };
};