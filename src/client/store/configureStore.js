import { createStore, applyMiddleware } from 'redux';
import promiseMiddleware from 'redux-promise-middleware';

import rootReducer from '../app/reducers';
import authMiddleware from '../middleware/auth';
import { REQUEST_TYPES } from 'utils/createRequestActionTypes';

export default function configureStore(initialState) {
  const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(
      authMiddleware(),
      promiseMiddleware({
        promiseTypeSuffixes: REQUEST_TYPES,
      })
    )
  );

  if (module.hot) {
    module.hot.accept('../app/reducers', () => {
      // eslint-disable-next-line global-require
      const nextRootReducer = require('../app/reducers').default;

      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}