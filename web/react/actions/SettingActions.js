import * as iQueueApi from '../utils/iQueueApi.js';
import Dispatcher from '../dispatcher/AppDispatcher.js';
import { Actions } from '../utils/Constants.js';

export function updateNotifyMessage(notifyMessage) {
  Dispatcher.handleViewAction({
    type: Actions.UPDATE_NOTIFY_MESSAGE,
    notifyMessage: notifyMessage,
  });
}

