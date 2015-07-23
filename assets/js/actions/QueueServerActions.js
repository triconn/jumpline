var Dispatcher = require('../dispatcher/AppDispatcher.js');
var QueueConstants = require('../constants/QueueConstants.js');

module.exports = {

  receiveAddGuest: function(guest) {
    Dispatcher.handleServerAction({
      type: QueueConstants.ADD_GUEST_RESPONSE,
      guest: guest
    });
  },

  receiveGetGuests: function(guests) {
    Dispatcher.handleServerAction({
      type: QueueConstants.GET_GUESTS_RESPONSE,
      guests: guests
    });
  }
};

