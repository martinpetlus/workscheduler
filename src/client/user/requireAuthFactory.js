import { userSelector } from '../app/reducers';

export default (store) => (nextState, replace) => {
  const authenticated = userSelector(store.getState()).get('authenticated');

  if (!authenticated) {
    replace({
      pathname: '/signin',
      state: { nextPathname: nextState.location.pathname },
    });
  }
};
