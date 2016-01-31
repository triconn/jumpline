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

  NOTIFY_GUEST_REQUEST: null,
  NOTIFY_GUEST_SUCCESS: null,
  NOTIFY_GUEST_FAILURE: null,

  SET_VIEW: null,
  UPDATE_NOTIFY_MESSAGE: null,

});

export const Defaults = {
  DEFAULT_NOTIFY_MESSAGE: 'You have been notified!',
};

export const ViewFilters = KeyMirror({
  CURRENT_GUESTS: null,
  COMPLETED_GUESTS: null,
});
