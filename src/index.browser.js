import Debug from 'debug';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './lib/store.js';

import App from './containers/App.jsx';
import './index.css';

if (module.hot) {
  module.hot.accept();
}

const log = {
  iq: Debug('iq'),
  store: Debug('iq:store'),
};

const store = configureStore();

// Show debug example
log.iq(`Debug logging available on the following channels:
       iq
       iq:store`);

// Debug store state changes
store.subscribe(() => {
  log.store(JSON.stringify(store.getState(), {}, 1));
});

ReactDOM.render(
  React.createElement(Provider, { store }, React.createElement(App)),
  document.getElementById('App')
);
