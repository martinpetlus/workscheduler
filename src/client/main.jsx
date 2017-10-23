// eslint-disable-next-line import/no-extraneous-dependencies
import 'babel-polyfill';

import React from 'react';
import { render } from 'react-dom';
import createHistory from 'history/createBrowserHistory';

import Root from './app/Root';
import configureStore from './store/configureStore';

const history = createHistory();
const store = configureStore(history);

render(
  <Root store={store} history={history} />,
  document.getElementById('root'),
);

if (module.hot) {
  module.hot.accept();
}
