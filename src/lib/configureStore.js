import Debug from 'debug';
import { applyMiddleware, createStore, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/index.js';

const log = Debug('iq');

const createStoreWithMiddleware = applyMiddleware(
  thunk
)(createStore);

export default function configureStore(initialState) {

  const store = createStore(rootReducer, initialState, compose(
    applyMiddleware(thunk),
    typeof window === 'object' && typeof window.devToolsExtension !== 'undefined'
      ? window.devToolsExtension()
      : f => f
  ));

  // Enable Webpack hot module replacement for reducers
	if (module.hot) {
    log('Module is hot!');
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers/index.js');
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}
