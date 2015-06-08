/**
* Guest.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {

    estimate: {
      type: 'integer',
      defaultsTo: 15
    },

    name: {
      type: 'string',
      required: true
    },

    phone: {
      type: 'string'
    },

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

    queuedAt: {
      type: 'datetime'
    },

    estimatedAt: {
      type: 'datetime'
    }

  },

  notify: function (options, cb) {

    Guest.findOne(options.id).exec(function (err, result) {
      if (err) return cb(err);

    });
  }
};
