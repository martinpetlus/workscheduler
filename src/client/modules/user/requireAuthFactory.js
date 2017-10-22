import { getIsAuthenticated } from './index';

export default store => (nextState, replace) => {
  const authenticated = getIsAuthenticated(store.getState());

  if (!authenticated) {
    replace({
      pathname: '/signin',
      state: { nextPathname: nextState.location.pathname },
    });
  }
};
