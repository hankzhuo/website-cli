const webpack = require('webpack')
const path = require('path')
const ExtractText = require('extract-text-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const AssetsPlugin = require('assets-webpack-plugin')

const webpackPlugins = [
  new ExtractText('css/[name].[chunkhash:8].css'),
  new CleanWebpackPlugin(['dist']),
  new AssetsPlugin(),
  new CopyPlugin([
    { from: 'public/images', to: 'images/' },
  ]),
]

if (process.argv.indexOf('--optimize-minimize') > -1) {
  webpackPlugins.push(new UglifyJSPlugin())
}

module.exports = {
  entry: {
    test: './public/index.js',
  },
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/test/public/',
    filename: 'js/[name].[chunkhash:8].js',
    chunkFilename: '[id].[chunkhash:8].js',
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ExtractText.extract({
          use: ['css-loader', 'sass-loader'],
          fallback: 'style-loader',
        }),
      },
      {
        test: /\.css$/,
        use: ExtractText.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'postcss-loader'],
        }),
      },
      {
        test: /\.(png|jpg|jpeg|gif)(\?v=\d+\.\d+\.\d+)?$/i,
        loader: 'url-loader',
        options: {
          limit: 10000,
        },
      }, {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          minetype: 'application/octet-stream',
        },
      }, {
        test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          minetype: 'application/font-woff',
        },
      }, {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          minetype: 'application/octet-stream',
        },
      }, {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader',
      }],
  },
  plugins: webpackPlugins,
}
