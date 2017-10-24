import { createStore, applyMiddleware, compose } from 'redux';
import promiseMiddleware from 'redux-promise-middleware';

import { REQUEST_TYPES } from 'utils/createRequestActionTypes';
import rootReducer from '../app/reducers';
import authMiddleware from '../middleware/auth';

// eslint-disable-next-line no-underscore-dangle
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function configureStore(history) {
  const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(
      authMiddleware(history),
      promiseMiddleware({
        promiseTypeSuffixes: REQUEST_TYPES,
      }),
    )),
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
