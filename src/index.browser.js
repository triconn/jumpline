import Debug from 'debug';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import routes from './config/routes.browser.js';
import { syncHistoryWithStore } from 'react-router-redux';
import configureStore from './lib/configureStore.js';

import './index.css';

if (module.hot) {
  module.hot.accept();
}

const log = {
  iq: Debug('iq'),
  store: Debug('iq:store'),
};

const store = configureStore();

const history = syncHistoryWithStore(browserHistory, store)

// Show debug example
log.iq(`Debug logging available on the following channels:
       iq
       iq:store`);
log.iq(`Debug channels enabled: '${localStorage.debug}'`);

ReactDOM.render(

  <Provider store={store}>
    <Router routes={routes} history={history} />
  </Provider>,

  document.getElementById('App')
);
