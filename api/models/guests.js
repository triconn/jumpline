// Guests that fill the queue

var Env = require('../config/env.js');
var dbConfig = Env.getDb();

module.exports = {

  identity: 'guests',

  connection: dbConfig.connection,

  migrate: dbConfig.migrate,

  attributes: {
    name: 'string',
    estimate: {
      type: 'integer',
      defaultsTo: function() {
        return 15;
      }
    },
    phone: 'string',
    status: {
      type: 'string',
      enum: [
        'new',
        'notified',
        'called',
        'completed',
        'cancelled'
      ],
      defaultsTo: 'new'
    },

    estimatedAt: {
      type: 'datetime',
      defaultsTo: function () {
        return new Date();
      }
    }
  }
};

