import { createStore } from 'redux';

export default function configureStore(rootReducer) {
  const store = createStore(rootReducer);

  return store;
}
