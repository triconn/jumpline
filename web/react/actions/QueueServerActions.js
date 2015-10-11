import Dispatcher from '../dispatcher/AppDispatcher.js';
import { QueueConstants } from '../constants/QueueConstants.js';

export function receiveAddGuest(guest) {
  Dispatcher.handleServerAction({
    type: QueueConstants.ADD_GUEST_RESPONSE,
    guest: guest,
  });
}

export function receiveGetGuests(guests) {
  Dispatcher.handleServerAction({
    type: QueueConstants.GET_GUESTS_RESPONSE,
    guests: guests,
  });
}

export function receiveNotifyGuest(guest) {
  Dispatcher.handleServerAction({
    type: QueueConstants.NOTIFY_GUEST_RESPONSE,
    guest: guest,
  });
}

export function receiveCompleteGuest(guest) {
  Dispatcher.handleServerAction({
    type: QueueConstants.COMPLETE_GUEST_RESPONSE,
    guest: guest,
  });
}

