var Path = require('path');
var Fs = require('fs');

// Get models
var models = [];
Fs.readdirSync(Path.normalize(__dirname + '/../api/models')).forEach(function(file) {
  var model = require('../api/models/' + file);
  models.push(model);
});

module.exports = [{
  register: require('inert')
}, {
  register: require('vision')
}, {

  register: require('dogwater'),
  options: {
    models: models,

    connections: {
      disk: {
        adapter: 'disk'
      }
    },

    adapters: {
      disk: require('sails-disk'),
      mongo: require('sails-mongo')
    }
  }

}, {

  register: require('good'),
  options: {
    opsInterval: 1000,
    reporters: [{
      reporter: require('good-console'),
      events: { log: '*', request: '*', response: '*', error: '*' }
    }]
  }
}, {

  register: require('hapi-swagger')
}];

