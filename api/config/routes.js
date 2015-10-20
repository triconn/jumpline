var Reqdir = require('require-directory');

var controllers = Reqdir(module, '../controllers', {exclude: /__tests__/});

module.exports = [{
  method: 'GET',
  path: '/guests',
  config: controllers.guests.index
}, {
  method: 'POST',
  path: '/guests',
  config: controllers.guests.create
}, {
  method: 'PATCH',
  path: '/guests/{id}/notify',
  config: controllers.guests.notify
}, {
  method: 'PATCH',
  path: '/guests/{id}/complete',
  config: controllers.guests.complete
},


  // Non-controller paths
{
  method: 'GET',
  path: '/',
  handler: {
    view: 'home'
  }
}, {
  method: 'GET',
  path: '/static/{param*}',
  handler: {
    directory: {
      path: 'web/static'
    }
  }
}];

