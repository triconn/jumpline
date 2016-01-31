jest.dontMock('../QueueStore.js');
import { Actions, ViewFilters } from '../../utils/Constants.js';

describe('QueueStore', () => {
  let AppDispatcher;
  let QueueStore;
  let callback;

  // mock actions
  const actionGuestAdd = {
    action: {
      type: Actions.ADD_GUEST_RESPONSE,
      guest: {
        'name': 'John Smith',
        'phone': '5551234567',
        'estimate': 15,
        'status': 'new',
        'estimatedAt': '2015-10-19T00:20:41.350Z',
        'createdAt': '2015-10-19T00:20:41.359Z',
        'updatedAt': '2015-10-19T00:20:41.359Z',
        'id': 60,
      },
    }
  };
  const actionGuestNotify = {
    action: {
      type: Actions.NOTIFY_GUEST_RESPONSE,
      guest: {
        'name': 'John Smith',
        'phone': '5551234567',
        'estimate': 15,
        'status': 'notified',
        'estimatedAt': '2015-10-19T00:20:41.350Z',
        'createdAt': '2015-10-19T00:20:41.359Z',
        'updatedAt': '2015-10-19T00:20:41.359Z',
        'id': 60,
      },
    }
  };
  const actionGuestComplete = {
    action: {
      type: Actions.COMPLETE_GUEST_RESPONSE,
      guest: {
        'name': 'John Smith',
        'phone': '5551234567',
        'estimate': 15,
        'status': 'completed',
        'estimatedAt': '2015-10-19T00:20:41.350Z',
        'createdAt': '2015-10-19T00:20:41.359Z',
        'updatedAt': '2015-10-19T00:20:41.359Z',
        'id': 60,
      },
    }
  };

  beforeEach(() => {
    AppDispatcher = require('../../utils/AppDispatcher.js');
    QueueStore = require('../QueueStore.js');
    callback = AppDispatcher.register.mock.calls[0][0];
  });

  it('registers a callback with the dispatcher', () => {
    expect(AppDispatcher.register.mock.calls.length).toBe(1);
  });

  it('initializes with no guests in the queue', () => {
    const all = QueueStore.getQueue();
    expect(all.guests).toEqual([]);
  });

  it('adds a new guest from server response', () => {
    callback(actionGuestAdd);
    const all = QueueStore.getQueue();
    expect(all.guests.length).toBe(1);
    expect(all.guests[0].name).toBe('John Smith');
  });

  it('notifies a guest from server response', () => {
    callback(actionGuestAdd);
    callback(actionGuestNotify);
    const all = QueueStore.getQueue();
    expect(all.guests.length).toBe(1);
    expect(all.guests[0].status).toBe('notified');
  });

  it('completes a guest from server response', () => {
    callback(actionGuestAdd);
    callback(actionGuestComplete);
    const all = QueueStore.getQueue();
    expect(all.guests.length).toBe(1);
    expect(all.guests[0].status).toBe('completed');
  });
});

