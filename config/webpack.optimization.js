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
    new OptimizeCSSAssetsPlugin({
      cssProcessorOptions: {
        map: {
          // Enable CSS source maps
          inline: false
        }
      }
    })
  ],
  splitChunks: {
    cacheGroups: {
      vendor: {
        test: /[\\/]node_modules[\\/].*\.js$/,
        name: 'vendor',
        chunks: 'all',
        enforce: true
      }
    }
  }
};

export default optimization;
