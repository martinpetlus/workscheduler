import { createStore } from 'redux';

import rootReducer from './reducers';

export default function configureStore(initialState) {
  const store = createStore(rootReducer, initialState);

  if (module.hot) {
    module.hot.accept('./reducers', () => {
      // eslint-disable-next-line global-require
      const nextRootReducer = require('./reducers').default;

      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}
