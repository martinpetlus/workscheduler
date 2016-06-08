export default (state, reduxMountPoint) =>
  state.get(reduxMountPoint).toJS();
