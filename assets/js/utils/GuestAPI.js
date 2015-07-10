var QueueServerActions = require('../actions/QueueServerActions.js');
var base = window.location.protocol;
var getGuestsUrl = base + '/guest';
var postGuestUrl = base + '/guest';

module.exports = {

  add: function(guest) {
    $.ajax({
      url: postGuestUrl,
      type: 'POST',
      data: guest,
      success: function (createdGuest) {

        // if adding guest to server was successful
        console.log('Created guest: ' + JSON.stringify(createdGuest));
        QueueServerActions.receiveAddGuest(createdGuest);
      },

      error: function (err) {

        console.error(err);
      }

    });

  },

  get: function() {
    console.log('location ' + window.location.protocol);
    $.get({
      url: getGuestsUrl,
      success: function(guests) {
        QueueServerActions.receiveGetGuests(guests.body);
      },
      error: function(err) {
        console.error(err);
      }
    });
  }
};

