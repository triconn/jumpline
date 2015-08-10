var QueueServerActions = require('../actions/QueueServerActions.js');
var request = require('superagent');

var completeGuestUrl = '/guests/{id}/notify';

module.exports = {

  add: function(guest) {

    var addGuestUrl = '/guests';

    request.post(addGuestUrl)
    .set('Content-Type', 'application/json')
    .send({ guest: guest })
    .end(function(err, res) {
      if(err) return console.error(err);

      console.log('Created guest: ' + JSON.stringify(res.body));
      QueueServerActions.receiveAddGuest(res.body.guest);

    });

  },

  get: function() {

    var getGuestsUrl = '/guests';

    request.get(getGuestsUrl)
    .set('Accept', 'application/json')
    .end(function(err, res) {
      if(err) return console.error(err);

      console.log('All guests: ' + JSON.stringify(res.body.guests));
      QueueServerActions.receiveGetGuests(res.body.guests);

    });

  },

  notify: function(id) {

    var notifyGuestUrl = '/guests/' + id + '/notify';

    request.patch(notifyGuestUrl)
    .set('Accept', 'application/json')
    .end(function(err, res) {
      if(err) return console.error(err);

      console.log('Notified guest: ' + JSON.stringify(res.body.guest));
      QueueServerActions.receiveNotifyGuest(res.body.guest);

    });

  }

};

