// All the routes

export const routes = [
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
