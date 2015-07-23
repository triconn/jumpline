var Boom = require('boom');

module.exports = {

  index: {
    description: 'Get current guests',
    handler: function(request, reply) {

      var Guests = request.model.guests;

      Guests.find().then(function(guests) {

        var result = {
          guests: guests
        };
        reply(result);

      });
    }
  },

  create: {
    description: 'Create guest',
    handler: function(request, reply) {

      var Guests = request.model.guests;

      Guests.create(request.payload.guest)
      .exec(function(err, guest) {
        if(err) return reply(Boom.badRequest(err));

        reply({ guest: guest })
        .code(201);

      });
    }
  }

};

