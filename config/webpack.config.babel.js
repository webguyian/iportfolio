/* eslint-disable no-sync */
import fs from 'fs';
import path from 'path';
import optimization from './webpack.optimization';
import plugins from './webpack.plugins';
import rules from './webpack.rules';
import settings from './app-settings';

const devMode = process.env.NODE_ENV !== 'production';

// Start API Server
if (devMode) {
  settings.start();
}

export default {
  mode: devMode ? 'development' : 'production',
  entry: ['@babel/polyfill', './src/index.js'],
  devServer: {
    clientLogLevel: 'warning',
    compress: true,
    contentBase: settings.ROOT_DIR,
    historyApiFallback: true,
    host: settings.HOST,
    hot: true,
    https: true,
    key: fs.readFileSync(path.join(__dirname, '/cert/key.pem')),
    cert: fs.readFileSync(path.join(__dirname, '/cert/cert.pem')),
    open: true,
    overlay: true,
    port: settings.APP_PORT,
    proxy: settings.API_PROXY_CONFIG()
  },
  devtool: devMode ? 'cheap-module-eval-source-map' : 'source-map',
  module: {
    rules
  },
  output: {
    path: settings.OUTPUT_DIR,
    filename: '[name].js',
    chunkFilename: '[name].js',
    publicPath: devMode ? undefined : '/iportfolio/'
  },
  plugins,
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    modules: ['node_modules', 'src'],
    alias: { 'react-dom': '@hot-loader/react-dom' }
  },
  optimization
};
