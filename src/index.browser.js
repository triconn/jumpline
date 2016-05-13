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
  jl: Debug('jl'),
  store: Debug('jl:store'),
};

const store = configureStore();

const history = syncHistoryWithStore(browserHistory, store)

// Show debug example
log.jl(`Debug logging available on the following channels:
       jl
       jl:store`);
log.jl(`Debug channels enabled: '${localStorage.debug}'`);

ReactDOM.render(

  <Provider store={store}>
    <Router routes={routes} history={history} />
  </Provider>,

  document.getElementById('App')
);
