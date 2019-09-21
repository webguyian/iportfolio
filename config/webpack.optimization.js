import OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin';
import TerserPlugin from 'terser-webpack-plugin';

const optimization = {
  minimizer: [
    new TerserPlugin({
      cache: true,
      parallel: true,
      sourceMap: true,
      terserOptions: {
        /* eslint-disable camelcase */
        keep_fnames: true
      }
    }),
    new OptimizeCSSAssetsPlugin({})
  ],
  splitChunks: {
    cacheGroups: {
      vendor: {
        name: 'vendor',
        chunks: 'all',
        enforce: true,
        reuseExistingChunk: true,
        test: /[\\/]node_modules[\\/].*\.js$/
      }
    }
  }
};

export default optimization;
