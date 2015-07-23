var Reqdir = require('require-directory');

var controllers = Reqdir(module, '../api/controllers');

module.exports = [{
  method: 'GET',
  path: '/guests',
  config: controllers.guests.index
}, {
  method: 'POST',
  path: '/guests',
  config: controllers.guests.create
},

  // Non-controller paths
{
  method: 'GET',
  path: '/',
  handler: {
    view: 'Default'
  }
}, {
  method: 'GET',
  path: '/{param*}',
  handler: {
    directory: {
      path: 'assets',
      index: ['index.html']
    }
  }
}];

