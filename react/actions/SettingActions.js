import * as JumplineApi from '../utils/JumplineApi.js';
import Dispatcher from '../utils/AppDispatcher.js';
import { Actions } from '../utils/Constants.js';

export function updateNotifyMessage(notifyMessage) {
  Dispatcher.handleViewAction({
    type: Actions.UPDATE_NOTIFY_MESSAGE,
    notifyMessage: notifyMessage,
  });
}

