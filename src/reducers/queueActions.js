import Debug from 'debug'
import { Actions } from '../lib/constants.js'
import Jumpline from '../helpers/jumpline.js'

const log = Debug('jl:queueActions')

export function addGuestRequest () {

  return {
    type: Actions.ADD_GUEST_REQUEST,
  }

}

export function addGuestSuccess (guest) {

  return {
    type: Actions.ADD_GUEST_SUCCESS,
    guest,
  }

}

export function addGuestFailure (error) {

  return {
    type: Actions.ADD_GUEST_FAILURE,
    error,
  }

}

export function addGuest (newGuest, returnFields) {

  return (dispatch) => {

    dispatch(addGuestRequest())

    return new Jumpline().addGuest(newGuest, returnFields)
    .then((data) => {

      log('addGuest result', data.addGuest)
      dispatch(addGuestSuccess(data.addGuest))

    })
    .catch((error) => {

      dispatch(addGuestFailure(error))

    })

  }

}


export function getGuestsRequest () {

  return {
    type: Actions.GET_GUESTS_REQUEST,
  }

}

export function getGuestsSuccess (guests) {

  return {
    type: Actions.GET_GUESTS_SUCCESS,
    guests,
  }

}

export function getGuestsFailure (error) {

  return {
    type: Actions.GET_GUESTS_FAILURE,
    error,
  }

}

export function getGuests (...args) {

  return (dispatch) => {

    dispatch(getGuestsRequest())

    return new Jumpline().getGuests(...args)
    .then((data) => {

      log('getGuests result', data.viewer.currentGuests)
      dispatch(getGuestsSuccess(data.viewer.currentGuests))

    })
    .catch((error) => {

      dispatch(getGuestsFailure(error))

    })

  }

}


export function notifyGuestRequest (id) {

  return {
    type: Actions.NOTIFY_GUEST_REQUEST,
    id,
  }

}

export function notifyGuestSuccess (guest) {

  return {
    type: Actions.NOTIFY_GUEST_SUCCESS,
    guest,
  }

}

export function notifyGuestFailure (error) {

  return {
    type: Actions.NOTIFY_GUEST_FAILURE,
    error,
  }

}

export function notifyGuest (guestId, returnFields) {

  return (dispatch) => {

    dispatch(notifyGuestRequest(guestId))

    return new Jumpline().notifyGuest(guestId, returnFields)
    .then((data) => {

      log('notifyGuest result', data.notifyGuest)
      dispatch(notifyGuestSuccess(data.notifyGuest))

    })
    .catch((error) => {

      dispatch(notifyGuestFailure(error))

    })

  }

}


export function completeGuestRequest (id) {

  return {
    type: Actions.COMPLETE_GUEST_REQUEST,
    id,
  }

}

export function completeGuestSuccess (guest) {

  return {
    type: Actions.COMPLETE_GUEST_SUCCESS,
    guest,
  }

}

export function completeGuestFailure (error) {

  return {
    type: Actions.COMPLETE_GUEST_FAILURE,
    error,
  }

}

export function completeGuest (guestId, returnFields) {

  return (dispatch) => {

    dispatch(completeGuestRequest(guestId))

    return new Jumpline().completeGuest(guestId, returnFields)
    .then((data) => {

      log('completeGuest result', data.completeGuest)
      dispatch(completeGuestSuccess(data.completeGuest))

    })
    .catch((error) => {

      dispatch(completeGuestFailure(error))

    })

  }

}
