import { Actions } from '../lib/constants.js'

export function setQueueFilter (queueFilter) {

  return {
    type: Actions.SET_QUEUE_FILTER,
    queueFilter,
  }

}
