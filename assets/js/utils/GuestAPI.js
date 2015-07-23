var QueueServerActions = require('../actions/QueueServerActions.js');
var request = require('superagent');

var getGuestsUrl = '/guests';
var postGuestUrl = '/guests';

module.exports = {

  add: function(guest) {

    request.post(postGuestUrl)
    .set('Content-Type', 'application/json')
    .send({ guest: guest })
    .end(function(err, res) {
      if(err) return console.error(err);

      console.log('Created guest: ' + JSON.stringify(res.body));
      QueueServerActions.receiveAddGuest(res.body.guest);

    });

  },

  get: function() {

    request.get(getGuestsUrl)
    .set('Accept', 'application/json')
    .end(function(err, res) {
      if(err) return console.error(err);

      console.log('All guests: ' + JSON.stringify(res.body.guests));
      QueueServerActions.receiveGetGuests(res.body.guests);

    });

  }
};

