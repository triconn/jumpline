import Debug from 'debug';
import { Actions } from '../lib/constants.js';

const log = Debug('jl:queueFilterActions');

export function setQueueFilter(queueFilter) {
  return {
    type: Actions.SET_QUEUE_FILTER,
    queueFilter,
  };
}
