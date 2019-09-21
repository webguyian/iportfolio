import CleanWebpackPlugin from 'clean-webpack-plugin';
import MiniCSSExtractPlugin from 'mini-css-extract-plugin';
import StyleLintPlugin from 'stylelint-webpack-plugin';
import webpack from 'webpack';

const plugins = [
  new CleanWebpackPlugin(),
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
    filename: '[name].css'
  }),
  new webpack.HotModuleReplacementPlugin()
];

export default plugins;
