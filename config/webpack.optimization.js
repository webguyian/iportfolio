import OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin';
import TerserPlugin from 'terser-webpack-plugin';

const optimization = {
  minimizer: [
    new TerserPlugin({
      cache: true,
      extractComments: false,
      parallel: true,
      sourceMap: true
    }),
    new OptimizeCSSAssetsPlugin({})
  ],
  splitChunks: {
    cacheGroups: {
      vendor: {
        test: /[\\/]node_modules[\\/].*\.js$/,
        name: 'vendor',
        chunks: 'all',
        enforce: true,
        reuseExistingChunk: true
      }
    }
  }
};

export default optimization;
