var Dispatcher = require('../dispatcher/AppDispatcher.js');
var QueueConstants = require('../constants/QueueConstants.js');
var ObjectAssign = require('object-assign');
var EventEmitter = require('events').EventEmitter;

var CHANGE_EVENT = 'change';

var _queue = {
  guests: []
};

var QueueStore = ObjectAssign({}, EventEmitter.prototype, {

  addChangeListener: function(cb) {
    this.on(CHANGE_EVENT, cb);
  },

  removeChangeListener: function(cb) {
    this.removeListener(CHANGE_EVENT, cb);
  },

  getQueue: function() {
    return _queue;
  }
});

Dispatcher.register(function(payload) {

  switch(payload.action.type) {

    case QueueConstants.ADD_GUEST_RESPONSE:
      //add new guest to end of the list
      _queue.guests.push(payload.action.guest);
      QueueStore.emit(CHANGE_EVENT);
      break;

    case QueueConstants.GET_GUESTS_RESPONSE:
      //replace current guest queue with response
      _queue.guests = payload.action.guests;
      QueueStore.emit(CHANGE_EVENT);
      break;

    case QueueConstants.NOTIFY_GUEST_RESPONSE:
      //find notified guest and replace with response
      _queue.guests = _queue.guests.map(function(guest) {
        if(guest.id !== payload.action.guest.id) {
          return guest;
        } else {
          return payload.action.guest;
        };
      });
      QueueStore.emit(CHANGE_EVENT);
      break;

    case QueueConstants.COMPLETE_GUEST_RESPONSE:
      //remove completed guest from queue
      _queue.guests.map(function(guest) {
        if(guest.id !== action.guest.id) {
          return guest;
        };
      });
      QueueStore.emit(CHANGE_EVENT);
      break;

   default:
      console.log('No QueueStore handler found for the following type: ' + payload.action.type);
  }
});

module.exports = QueueStore;

