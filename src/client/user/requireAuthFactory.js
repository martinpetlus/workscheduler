export default (store) => (nextState, replace) => {
  const authenticated = store.getState().getIn(['user', 'authenticated']);

  if (!authenticated) {
    replace({
      pathname: '/signin',
      state: { nextPathname: nextState.location.pathname },
    });
  }
};
