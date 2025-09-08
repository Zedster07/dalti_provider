module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo', '@babel/preset-typescript'],
    plugins: [
      // Reanimated plugin should be listed last
      'react-native-reanimated/plugin',
    ],
  };
};
