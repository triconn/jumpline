import Dispatcher from '../dispatcher/AppDispatcher.js';
import { Actions } from '../utils/Constants.js';

export function receiveAddGuest(guest) {
  Dispatcher.handleServerAction({
    type: Actions.ADD_GUEST_RESPONSE,
    guest: guest,
  });
}

export function receiveGetGuests(guests) {
  Dispatcher.handleServerAction({
    type: Actions.GET_GUESTS_RESPONSE,
    guests: guests,
  });
}

export function receiveNotifyGuest(guest) {
  Dispatcher.handleServerAction({
    type: Actions.NOTIFY_GUEST_RESPONSE,
    guest: guest,
  });
}

export function receiveCompleteGuest(guest) {
  Dispatcher.handleServerAction({
    type: Actions.COMPLETE_GUEST_RESPONSE,
    guest: guest,
  });
}

