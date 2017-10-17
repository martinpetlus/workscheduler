import 'babel-polyfill';

import React from 'react';
import { render } from 'react-dom';
import { browserHistory } from 'react-router';

import Root from './app/Root';
import configureStore from './store/configureStore';

const store = configureStore(browserHistory);

render(
  <Root store={store} history={browserHistory} />,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept();
}
