export default (localState, selector) =>
  (state, ...args) => selector(localState(state), ...args);
