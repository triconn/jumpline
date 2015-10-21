import AppDispatcher from '../dispatcher/AppDispatcher.js';
import { Actions } from '../utils/Constants.js';
import { EventEmitter } from 'events';

const CHANGE_EVENT = 'change';

let _queue = {
  guests: [],
};

class QueueStoreClass extends EventEmitter {

  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  }

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }

  getQueue() {
    return _queue;
  }
}

const QueueStore = new QueueStoreClass();

AppDispatcher.register((payload) => {
  switch (payload.action.type) {

  case Actions.ADD_GUEST_RESPONSE:
    // add new guest to end of the list
    _queue.guests.push(payload.action.guest);
    QueueStore.emit(CHANGE_EVENT);
    break;

  case Actions.GET_GUESTS_RESPONSE:
    // replace current guest queue with response
    _queue.guests = payload.action.guests;
    QueueStore.emit(CHANGE_EVENT);
    break;

  case Actions.NOTIFY_GUEST_RESPONSE:
    // find notified guest and replace with response
    _queue.guests = _queue.guests.map((guest) => {
      if (guest.id !== payload.action.guest.id) {
        return guest;
      }
      return payload.action.guest;
    });
    QueueStore.emit(CHANGE_EVENT);
    break;

  case Actions.COMPLETE_GUEST_RESPONSE:
    // remove completed guest from queue
    _queue.guests = _queue.guests.filter((guest) => {
      return guest.id !== payload.action.guest.id;
    });
    QueueStore.emit(CHANGE_EVENT);
    break;

  default:
    console.log('No QueueStore handler found for the following type: ' + payload.action.type);
  }
});

export default QueueStore;

