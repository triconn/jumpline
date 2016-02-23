require('babel-register');
// Webpack config file
const Path = require('path');
const Webpack = require('webpack');
const getJsBundle = require('../lib/utils.js').getJsBundle();

module.exports = {
  devtool: 'source-map',
  entry: [
    './src/index.browser.js',
  ],
  output: {
    filename: getJsBundle,
    path: Path.resolve(__dirname, '../../static/js'),
    publicPath: '/static/js/',
  },
  plugins: [
    new Webpack.optimize.OccurenceOrderPlugin(),
    new Webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production'),
        'IQUEUE_API_URL': JSON.stringify(process.env.IQUEUE_API_URL),
      },
    }),
    new Webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
    }),
  ],
	module: {
    loaders: [
      {
        test: /\.js$|\.jsx$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react'],
        },
      },
      {
        test: /\.css$/,
        loaders: ['style-loader', 'css-loader'],
      },
      {
        test: /\.scss$/,
        loaders: ['style-loader', 'css-loader', 'sass-loader'],
      },
      // Configure loading font files, svg, etc
      {
        test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=10000&mimetype=application/font-woff',
      },
      {
        test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=10000&mimetype=application/font-woff',
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=10000&mimetype=application/octet-stream',
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader',
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=10000&mimetype=image/svg+xml',
      },
    ],
  },
	resolve: {
    root: [
      Path.resolve('../../src'),
    ],
  },
  sassConfig: {
    precision: 8,
  },
};
