import { fromJS } from 'immutable';

import { actionTypes } from './actions';

const initialState = fromJS({
  drawer: {
    open: false,
  },
});

export default function appReducer(state = initialState, { type }) {
  switch (type) {
    case actionTypes.OPEN_DRAWER:
      return state.setIn(['drawer', 'open'], true);
    case actionTypes.CLOSE_DRAWER:
      return state.setIn(['drawer', 'open'], false);
    default:
      return state;
  }
}

export function isDrawerOpen(state) {
  return state.getIn(['drawer', 'open']);
}
