import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import configureStore from './app/configureStore';
import rootReducer from './app/reducers';
import Root from './app/Root';

const store = configureStore(rootReducer);

render(
  <Provider {...{ store }}>
    <Root />
  </Provider>,
  document.getElementById('root')
);
