var Boom = require('boom');
var Joi = require('joi');
var Twilio = require('../services/twilio.js');

// Standard single guest object for responses
var GuestValidationObject = {
  id: Joi.number(),
  name: Joi.string().max(248).required(),
  phone: Joi.number().min(1111111111).max(9999999999).precision(0),
  estimate: Joi.number(),
  status: Joi.any().allow('new', 'notified', 'called', 'completed', 'cancelled'),
  createdAt: Joi.date().iso(),
  updatedAt: Joi.date().iso(),
  estimatedAt: Joi.date().iso()
};

var NotifyGuestValidationObject = GuestValidationObject;
NotifyGuestValidationObject.status = Joi.any().allow('notified');

var CompleteGuestValidationObject = GuestValidationObject;
CompleteGuestValidationObject.status = Joi.any().allow('completed');

module.exports = {

  index: {
    description: 'Get current guests',
    handler: function(request, reply) {

      var Guests = request.model.guests;

      Guests.find({
        status: { '!': 'completed' }
      }).then(function(guests) {

        var result = {
          guests: guests
        };
        reply(result);

      });
    },
    response: {
      schema: Joi.object().keys({
        guests: Joi.array().items(Joi.object().keys(GuestValidationObject))
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
        guest: GuestValidationObject
      })
    }
  },

  notify: {
    description: 'Notify guest with a text message',
    handler: function(request, reply) {

      var Guests = request.model.guests;

      //find guest
      Guests.findOne(request.params.id)
      .exec(function(err, guest) {

        if(err) return reply(Boom.badRequest(err));
        if(!guest || guest.length === 0) return reply(Boom.notFound('Guest ' + request.params.id + ' not found'));

        //send text message
        Twilio.sendNotification({
          msg: guest.name + ', you\'ve been notified!',
          phone: guest.phone
        }, function(err, message) {

          if(err) return reply(Boom.badRequest(JSON.stringify(err)));

          //notification sent
          //update guest status to notified
          Guests.update({
            id: request.params.id
          }, {
            status: 'notified'
          })
          .exec(function(err, guest) {

            if(err) return reply(Boom.badRequest(err));
            if(!guest || guest.length === 0) return reply(Boom.notFound('Guest ' + request.params.id + ' not found'));

            // return updated guest
            reply({ guest: guest[0] });

          });

        });
      });

    },
    validate: {
      params: {
        id: Joi.number()
      }
    },
    response: {
      schema: Joi.object().keys({
        guest: NotifyGuestValidationObject
      })
    }
  },

  complete: {
    description: 'Mark guest as completed',
    handler: function(request, reply) {

      var Guests = request.model.guests;

      //update guest status to completed
      Guests.update({
        id: request.params.id
      }, {
        status: 'completed'
      })
      .exec(function(err, guest) {

        if(err) return reply(Boom.badRequest(err));
        if(!guest || guest.length === 0) return reply(Boom.notFound('Guest ' + request.params.id + ' not found'));

        // return updated guest
        reply({ guest: guest[0] });

      });

    },
    validate: {
      params: {
        id: Joi.number()
      }
    },
    response: {
      schema: Joi.object().keys({
        guest: CompleteGuestValidationObject
      })
    }
  }

};

