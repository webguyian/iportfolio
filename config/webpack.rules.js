import autoprefixer from 'autoprefixer';
import flexbugfixes from 'postcss-flexbugs-fixes';
import MiniCSSExtractPlugin from 'mini-css-extract-plugin';

const devMode = process.env.NODE_ENV !== 'production';

const rules = [
  {
    test: /\.jsx?$/,
    exclude: /node_modules/,
    use: [
      'babel-loader',
      {
        loader: 'eslint-loader',
        options: {
          fix: true
        }
      }
    ]
  },
  {
    test: /\.(sa|sc|c)ss$/,
    exclude: /node_modules/,
    use: [
      devMode ? 'style-loader' : MiniCSSExtractPlugin.loader,
      {
        loader: 'css-loader',
        options: {
          sourceMap: true
        }
      },
      {
        loader: 'postcss-loader',
        options: {
          ident: 'postcss',
          plugins: [autoprefixer, flexbugfixes],
          sourceMap: true
        }
      },
      {
        loader: 'sass-loader',
        options: {
          sourceMap: true
        }
      }
    ]
  }
];

export default rules;
