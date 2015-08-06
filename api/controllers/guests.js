var Boom = require('boom');
var Joi = require('joi');

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
    },
    response: {
      schema: Joi.object().keys({
        guests: Joi.array().items(Joi.object().keys({
          id: Joi.number(),
          name: Joi.string().max(248).required(),
          phone: Joi.number().min(1111111111).max(9999999999).precision(0),
          estimate: Joi.number(),
          status: Joi.any().allow('new', 'notified', 'called', 'completed', 'cancelled'),
          createdAt: Joi.date().iso(),
          updatedAt: Joi.date().iso(),
          estimatedAt: Joi.date().iso()
        }))
      })
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
    },
    validate: {
      payload: Joi.object().keys({
        guest: {
          name: Joi.string().max(248).required(),
          phone: Joi.number().min(1111111111).max(9999999999).precision(0),
          estimate: Joi.number()
        }
      })
    },
    response: {
      schema: Joi.object().keys({
        guest: {
          id: Joi.number(),
          name: Joi.string().max(248).required(),
          phone: Joi.number().min(1111111111).max(9999999999).precision(0),
          estimate: Joi.number(),
          status: Joi.any().allow('new', 'notified', 'called', 'completed', 'cancelled'),
          createdAt: Joi.date().iso(),
          updatedAt: Joi.date().iso(),
          estimatedAt: Joi.date().iso()
        }
      })
    }
  }

};

