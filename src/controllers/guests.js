const Boom = require('boom');
const Joi = require('joi');
const sendNotification = require('../helpers/twilio.js').sendNotification;

// Standard single guest object for responses
const GuestValidationObject = {
  id: Joi.number(),
  name: Joi.string().max(248).required(),
  phone: Joi.number().min(1111111111).max(9999999999).precision(0),
  estimate: Joi.number(),
  status: Joi.any().allow('new', 'notified', 'called', 'completed', 'cancelled'),
  createdAt: Joi.date().iso(),
  updatedAt: Joi.date().iso(),
  estimatedAt: Joi.date().iso(),
};

const NotifyGuestValidationObject = GuestValidationObject;
NotifyGuestValidationObject.status = Joi.any().allow('notified');

const CompleteGuestValidationObject = GuestValidationObject;
CompleteGuestValidationObject.status = Joi.any().allow('completed');

export const index = {

  description: 'Get current guests',
  tags: ['api'],
  handler: (request, reply) => {

    const Guests = request.collections.guests;

    Guests.find({
      status: { '!': 'completed' },
    }).then((guests) => {

      const result = {
        guests,
      };
      reply(result);
      request.log(['guest', 'index'], { count: guests.length });

    });
  },
  response: {
    schema: Joi.object().keys({
      guests: Joi.array().items(Joi.object().keys(GuestValidationObject)),
    }),
  },
}

export const create = {

  description: 'Create guest',
  tags: ['api'],
  handler: (request, reply) => {

    const Guests = request.collections.guests;

    Guests.create(request.payload.guest)
    .exec((err, guest) => {

      if (err) {
        request.log(['guest', 'create', 'error'], { error: err });
        return reply(Boom.badRequest(err));
      }

      reply({ guest: guest })
      .code(201);
      request.log(['guest', 'create'], {guest: guest});

    });
  },
  validate: {
    payload: Joi.object().keys({
      guest: {
        name: Joi.string().max(248).required(),
        phone: Joi.number().min(1111111111).max(9999999999).precision(0),
        estimate: Joi.number(),
      },
    }),
  },
  response: {
    schema: Joi.object().keys({
      guest: GuestValidationObject,
    }),
  },
}

export const notify = {

  description: 'Notify guest with a text message',
  tags: ['api'],
  handler: (request, reply) => {

    const Guests = request.collections.guests;

    //find guest
    Guests.findOne(request.params.id)
    .exec((err, guest) => {

      if (err) {
        request.log([
          'guest',
          'notify',
          'error',
          'find-one',
        ], { error: err });
        return reply(Boom.badRequest(err));
      }
      if (!guest || guest.length === 0) {
        request.log([
          'guest',
          'notify',
          'find-one',
          'not-found',
        ], { guest: { id: request.params.id } });
        return reply(Boom.notFound('Guest ' + request.params.id + ' not found'));
      }

      //send text message
      sendNotification({
        msg: guest.name + ', you\'ve been notified!',
        phone: guest.phone,
      }, (err, message) => {

        if (err) {
          request.log([
            'guest',
            'notify',
            'text',
            'error',
          ], { error: err });
          return reply(Boom.badRequest(JSON.stringify(err)));
        }

        //notification sent
        //update guest status to notified
        Guests.update({
          id: request.params.id,
        }, {
          status: 'notified',
        })
        .exec((err, guest) => {

          if (err) {
            request.log([
              'guest',
              'notify',
              'error',
              'update',
            ], { error: err });
            return reply(Boom.badRequest(err));
          }
          if (!guest || guest.length === 0) {
            request.log([
              'guest',
              'notify',
              'update',
              'not-found',
            ], { guest: { id: request.params.id } });
            return reply(Boom.notFound(`Guest ${request.params.id} not found`));
          }

          // return updated guest
          reply({ guest: guest[0] });
          request.log([
            'guest',
            'notify',
          ], { guest: guest[0] });

        });
      });
    });

  },
  validate: {
    params: {
      id: Joi.number(),
    },
  },
  response: {
    schema: Joi.object().keys({
      guest: NotifyGuestValidationObject,
    }),
  },
}

export const complete = {

  description: 'Mark guest as completed',
  tags: ['api'],
  handler: (request, reply) => {

    const Guests = request.collections.guests;

    //update guest status to completed
    Guests.update({
      id: request.params.id,
    }, {
      status: 'completed',
    })
    .exec((err, guest) => {

      if (err) {
        request.log([
          'guest',
          'complete',
          'error',
          'update',
        ], { error: err });
        return reply(Boom.badRequest(err));
      }
      if (!guest || guest.length === 0) {
        request.log([
          'guest',
          'complete',
          'update',
          'not-found',
        ], { guest: { id: request.params.id } });
        return reply(Boom.notFound(`Guest ${request.params.id} not found`));
      }

      // return updated guest
      reply({ guest: guest[0] });
      request.log([
        'guest',
        'complete',
      ], { guest: guest[0] });

    });

  },
  validate: {
    params: {
      id: Joi.number(),
    },
  },
  response: {
    schema: Joi.object().keys({
      guest: CompleteGuestValidationObject,
    }),
  },
}

