import Debug from 'debug'
import { Actions } from '../lib/constants.js'
import Jumpline from '../helpers/iqueue.js'

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

export function addGuest (newGuestQuery) {

  return (dispatch) => {

    dispatch(addGuestRequest())

    return new Jumpline().query(newGuestQuery)
    .then((body) => {

      dispatch(addGuestSuccess(body.data.addGuest))

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


export function notifyGuestRequest(id) {
  return {
    type: Actions.NOTIFY_GUEST_REQUEST,
    id,
  }
}

export function notifyGuestSuccess(guest) {
  return {
    type: Actions.NOTIFY_GUEST_SUCCESS,
    guest,
  }
}

export function notifyGuestFailure(error) {
  return {
    type: Actions.NOTIFY_GUEST_FAILURE,
    error,
  }
}

export function notifyGuest(id) {

  return (dispatch) => {

    dispatch(notifyGuestRequest(id))

    return new Jumpline().notifyGuest(id)
    .then((body) => {

      log(`notifyGuest result`, body.guest)
      dispatch(notifyGuestSuccess(body.guest))

    })
    .catch((error) => {

      dispatch(notifyGuestFailure(error))

    })
  }
}


export function completeGuestRequest(id) {
  return {
    type: Actions.COMPLETE_GUEST_REQUEST,
    id,
  }
}

export function completeGuestSuccess(guest) {
  return {
    type: Actions.COMPLETE_GUEST_SUCCESS,
    guest,
  }
}

export function completeGuestFailure(error) {
  return {
    type: Actions.COMPLETE_GUEST_FAILURE,
    error,
  }
}

export function completeGuest(id) {

  return (dispatch) => {

    dispatch(completeGuestRequest(id))

    return new Jumpline().completeGuest(id)
    .then(body => {

      log(`completeGuest result`, body.guest)
      dispatch(completeGuestSuccess(body.guest))

    })
    .catch(error => {

      dispatch(completeGuestFailure(error))

    })
  }
}
