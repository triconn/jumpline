// All the API and static routes
const GuestController = require('../controllers/guests.js');

export const routes = [
  {
    method: 'GET',
    path: '/guests',
    config: GuestController.index,
  },
  {
    method: 'POST',
    path: '/guests',
    config: GuestController.create,
  },
  {
    method: 'PATCH',
    path: '/guests/{id}/notify',
    config: GuestController.notify,
  },
  {
    method: 'PATCH',
    path: '/guests/{id}/complete',
    config: GuestController.complete,
  },

    // Non-controller paths
  {
    method: 'GET',
    path: '/',
    handler: {
      view: 'Html',
    },
  },
  {
    method: 'GET',
    path: '/static/{param*}',
    handler: {
      directory: {
        path: 'static',
      },
    },
  },
];
