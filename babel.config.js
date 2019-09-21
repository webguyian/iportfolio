const babelConfig = api => {
  // Cache the returned value forever and don't call this function again.
  api.cache(true);

  const presets = ['@babel/preset-env', '@babel/preset-react'];
  const plugins = [
    'react-hot-loader/babel',
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-object-rest-spread',
    '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-transform-regenerator',
    '@babel/plugin-transform-runtime'
  ];

  return {
    presets,
    plugins
  };
};

module.exports = babelConfig;
