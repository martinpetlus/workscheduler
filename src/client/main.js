import 'babel-polyfill';

import React from 'react';
import { render } from 'react-dom';

import Root from './app/Root';
import configureStore from './store/configureStore';

const store = configureStore({});

render(
  <Root store={store} />,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept();
}
