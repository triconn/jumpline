jest.dontMock('../SettingStore.js');
import { Actions, Defaults, ViewFilters } from '../../utils/Constants.js';

describe('SettingStore', () => {
  let AppDispatcher;
  let SettingStore;
  let callback;

  // mock actions
  const actionUpdateNotifyMessage = {
    action: {
      type: Actions.UPDATE_NOTIFY_MESSAGE,
      notifyMessage: 'This is a different message',
    },
  };

  beforeEach(() => {
    AppDispatcher = require('../../dispatcher/AppDispatcher.js');
    SettingStore = require('../SettingStore.js');
    callback = AppDispatcher.register.mock.calls[0][0];
  });

  it('registers a callback with the dispatcher', () => {
    expect(AppDispatcher.register.mock.calls.length).toBe(1);
  });

  it('initializes with the default notifyMessage', () => {
    const settings = SettingStore.getAllSettings();
    expect(settings.notifyMessage).toBe(Defaults.DEFAULT_NOTIFY_MESSAGE);
  });

  it('getNotifyMessage returns notifyMessage', () => {
    const notifyMessage = SettingStore.getNotifyMessage();
    expect(notifyMessage).toBe(Defaults.DEFAULT_NOTIFY_MESSAGE);
  });

  it('updates the notifyMessage', () => {
    callback(actionUpdateNotifyMessage);
    const settings = SettingStore.getAllSettings();
    const expected = actionUpdateNotifyMessage.action.notifyMessage;
    expect(settings.notifyMessage).toBe(expected);
  });
});

