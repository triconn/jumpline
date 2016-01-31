import { Actions } from '../lib/constants.js';
import iQueue from '../helpers/iqueue.js';


export function addGuestRequest() {
  return {
    type: Actions.ADD_GUEST_REQUEST,
  };
}

export function addGuestSuccess(guest) {
  return {
    type: Actions.ADD_GUEST_SUCCESS,
    guest,
  };
}

export function addGuestFailure(error) {
  return {
    type: Actions.ADD_GUEST_FAILURE,
    error,
  };
}

export function addGuest(guest) {

  return dispatch => {

    dispatch(addGuestRequest());

    return new iQueue().addGuest(guest)
    .then(body => {

      dispatch(addGuestSuccess(body.guest));

    })
    .catch(error => {

      dispatch(addGuestFailure(error));

    });
  }
}


export function getGuestsRequest() {
  return {
    type: Actions.GET_GUESTS_REQUEST,
  };
}

export function getGuestsSuccess(guests) {
  return {
    type: Actions.GET_GUESTS_SUCCESS,
    guests,
  };
}

export function getGuestsFailure(error) {
  return {
    type: Actions.GET_GUESTS_FAILURE,
    error,
  };
}

export function getGuests() {

  return dispatch => {

    dispatch(getGuestsRequest());

    return new iQueue().getGuests()
    .then(body => {

      dispatch(getGuestsSuccess(body));

    })
    .catch(error => {

      dispatch(getGuestsFailure(error));

    });
  }
}


export function notifyGuestRequest() {
  return {
    type: Actions.NOTIFY_GUEST_REQUEST,
  };
}

export function notifyGuestSuccess() {
  return {
    type: Actions.NOTIFY_GUEST_SUCCESS,
  };
}

export function notifyGuestFailure(error) {
  return {
    type: Actions.NOTIFY_GUEST_FAILURE,
    error,
  };
}


export function completeGuestRequest() {
  return {
    type: Actions.COMPLETE_GUEST_REQUEST,
  };
}

export function completeGuestSuccess() {
  return {
    type: Actions.COMPLETE_GUEST_SUCCESS,
  };
}

export function completeGuestFailure(error) {
  return {
    type: Actions.COMPLETE_GUEST_FAILURE,
    error,
  };
}
