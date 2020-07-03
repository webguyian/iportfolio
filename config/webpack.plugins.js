import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCSSExtractPlugin from 'mini-css-extract-plugin';
import StyleLintPlugin from 'stylelint-webpack-plugin';
import webpack from 'webpack';

const plugins = [
  new CleanWebpackPlugin(),
  new HtmlWebpackPlugin({
    template: './src/index.html',
    inject: false
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
  new webpack.HotModuleReplacementPlugin()
];

export default plugins;
