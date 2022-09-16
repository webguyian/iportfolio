import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import CopyPlugin from 'copy-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCSSExtractPlugin from 'mini-css-extract-plugin';
import StyleLintPlugin from 'stylelint-webpack-plugin';
import webpack from 'webpack';

const devMode = process.env.NODE_ENV !== 'production';

const plugins = [
  new CleanWebpackPlugin(),
  new HtmlWebpackPlugin({
    template: './src/index.html',
    minify: {
      collapseWhitespace: true,
      removeComments: false
    }
  }),
  new CopyPlugin({
    patterns: [
      { from: './src/assets', to: 'assets' },
      { from: './src/manifest.json' },
      { from: './src/favicon.ico' },
      { from: './src/favicon-16x16.png' },
      { from: './src/favicon-32x32.png' },
      { from: './src/sw.js' }
    ]
  }),
  new StyleLintPlugin({
    configFile: '.stylelintrc.json',
    context: 'src',
    files: '**/*.scss',
    failOnError: false,
    lintDirtyModulesOnly: true,
    quiet: false,
    syntax: 'scss'
  }),
  new MiniCSSExtractPlugin({
    filename: 'main.css'
  }),
  new webpack.EnvironmentPlugin({
    API_PREFIX: devMode ? '' : 'https://iportfolio-api.vercel.app'
  }),
  new webpack.HotModuleReplacementPlugin()
];

export default plugins;
