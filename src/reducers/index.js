// Combine all reducers for the store
import { combineReducers } from 'redux';

// iQueue reducers
import queue from './queueReducer.js';

// The root reducer which combines all others
const rootReducer = combineReducers({
  queue,
});

export default rootReducer;
