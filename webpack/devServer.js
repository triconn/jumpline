require('babel-register');
require('babel-polyfill');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('./config.js');

new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  historyApiFallback: true
}).listen(3000, 'localhost', function (err, result) {
  if (err) {
    console.error(err);
  }
  console.log('env:', process.env.NODE_ENV);
  console.log('Listening at localhost:3000');
});

