import 'babel-polyfill';

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import Root from './app/Root';
import configureStore from './app/configureStore';

const initialState = {};

const store = configureStore(initialState);

render(
  <Provider {...{ store }}>
    <Root />
  </Provider>,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept();
}
