import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/index.js';

const createStoreWithMiddleware = applyMiddleware(
  thunk,
)(createStore);

export default const store = createStoreWithMiddleware(rootReducer);
