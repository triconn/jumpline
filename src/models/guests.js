// Guests that fill the queue
const DbConfig = require('../config/env.js').getDb();

module.exports = {

  identity: 'guests',

  connection: DbConfig.connection,

  migrate: DbConfig.migrate,

  attributes: {
    name: 'string',
    estimate: {
      type: 'integer',
      defaultsTo: () => {
        return 15;
      },
    },
    phone: 'string',
    status: {
      type: 'string',
      enum: [
        'new',
        'notified',
        'called',
        'completed',
        'cancelled',
      ],
      defaultsTo: 'new',
    },

    estimatedAt: {
      type: 'datetime',
      defaultsTo: () => {
        return new Date();
      },
    },
  },
};
