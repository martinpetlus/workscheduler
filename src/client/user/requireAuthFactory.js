export default (store) => (nextState, replaceState) => {
  const authenticated = store.getState().getIn(['user', 'authenticated']);

  if (!authenticated) {
    replaceState(
      { nextPathname: nextState.location.pathname },
      '/signin'
    );
  }
};
