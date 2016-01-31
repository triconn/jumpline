import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './lib/store.js';

import App from './containers/App.jsx';
import './index.css';

ReactDOM.render(
  React.createElement(Provider, { store }, React.createElement(App)),
  document.getElementById('App')
);
