const Dogwater = require('dogwater');
const Fs = require('fs');
const Good = require('good');
const GoodConsole = require('good-console');
const HapiSwagger = require('hapi-swagger');
const Inert = require('inert');
const Path = require('path');
const SailsDisk = require('sails-disk');
const Vision = require('vision');
const Webpack = require('webpack');
const WebpackConfig = require('./webpack.js');
const WebpackPlugin = require('hapi-webpack-plugin');

// Get models
let models = [];
Fs.readdirSync(Path.resolve(__dirname, '../models')).forEach(function(file) {
  let model = require('../models/' + file);
  models.push(model);
});

const plugins = [
  {
    register: Inert,
  },
  {
    register: Vision,
  },
  {
    register: Dogwater,
    options: {
      models: models,
      connections: {
        disk: {
          adapter: 'disk',
        },
      },
      adapters: {
        disk: SailsDisk,
      },
    },
  },
  {
    register: Good,
    options: {
      opsInterval: 5000,
      reporters: [
        {
          reporter: GoodConsole,
          events: { log: '*', request: '*', response: '*', error: '*' },
        },
      ],
    },
  },
  {
    register: HapiSwagger,
    options: {
      documentationPath: '/docs',
    },
  },

  // TODO: only use HMR in development
  {
    register: WebpackPlugin,
    options: {
      assets: {
        hot: true,
        historyApiFallback: true,
        noInfo: true,
        publicPath: WebpackConfig.output.publicPath,
      },
      compiler: new Webpack(WebpackConfig),
      hot: {},
    },
  },
];

export default plugins;
