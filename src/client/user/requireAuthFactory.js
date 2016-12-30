import { userSelector } from '../app/reducers';
import { isAuthenticated } from './userReducer';

export default (store) => (nextState, replace) => {
  const authenticated = isAuthenticated(userSelector(store.getState()));

  if (!authenticated) {
    replace({
      pathname: '/signin',
      state: { nextPathname: nextState.location.pathname },
    });
  }
};
