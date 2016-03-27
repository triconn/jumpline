import KeyMirror from 'key-mirror';

export const Actions = KeyMirror({

  ADD_GUEST_REQUEST: null,
  ADD_GUEST_SUCCESS: null,
  ADD_GUEST_FAILURE: null,

  COMPLETE_GUEST_REQUEST: null,
  COMPLETE_GUEST_SUCCESS: null,
  COMPLETE_GUEST_FAILURE: null,

  GET_GUESTS_REQUEST: null,
  GET_GUESTS_SUCCESS: null,
  GET_GUESTS_FAILURE: null,

  LOGIN_REQUEST: null,
  LOGIN_SUCCESS: null,
  LOGIN_FAILURE: null,

  NOTIFY_GUEST_REQUEST: null,
  NOTIFY_GUEST_SUCCESS: null,
  NOTIFY_GUEST_FAILURE: null,

  SET_QUEUE_FILTER: null,
  UPDATE_NOTIFY_MESSAGE: null,
});

export const DefaultSettings = {
  DEFAULT_NOTIFY_MESSAGE: 'You have been notified!',
  DEFAULT_QUEUE_FILTER: 'CURRENT_GUESTS',
};

export const QueueFilters = KeyMirror({
  ALL_GUESTS: null,
  CURRENT_GUESTS: null,
  COMPLETED_GUESTS: null,
});
