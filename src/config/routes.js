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
  {
    method: 'GET',
    path: `/${process.env.LOADERIO_TOKEN}/`,
    handler: (request, reply) => {
      return reply(process.env.LOADERIO_TOKEN);
    },
  },
  {
    method: 'GET',
    path: `/${process.env.LOADERIO_TOKEN}`,
    handler: (request, reply) => {
      return reply(process.env.LOADERIO_TOKEN);
    },
  },
];
