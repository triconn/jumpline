import AppDispatcher from '../dispatcher/AppDispatcher.js';
import { Actions, Defaults, ViewFilters } from '../utils/Constants.js';
import { EventEmitter } from 'events';

const CHANGE_EVENT = 'change';

let _settings = {
  notifyMessage: Defaults.DEFAULT_NOTIFY_MESSAGE,
};

class SettingStoreClass extends EventEmitter {

  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  }

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }

  getAllSettings() {
    return _settings;
  }

  getNotifyMessage() {
    return _settings.notifyMessage;
  }
}

const SettingStore = new SettingStoreClass();

AppDispatcher.register((payload) => {
  switch (payload.action.type) {

  case Actions.UPDATE_NOTIFY_MESSAGE:
    // replace current message with updated
    _settings.notifyMessage = payload.action.notifyMessage;
    SettingStore.emit(CHANGE_EVENT);
    break;

  default:
  }
});

export default SettingStore;

