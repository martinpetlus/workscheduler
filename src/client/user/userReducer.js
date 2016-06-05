import { Map } from 'immutable';

import { userActionTypes } from './userActions';

const initialState = Map({
  authenticated: false,
  authenticating: false,
  authenticationError: false,
});

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case userActionTypes.SIGN_IN.REQUEST:
      return state.merge({
        authenticated: false,
        authenticating: true,
        authenticationError: false,
      });
    case userActionTypes.SIGN_IN.SUCCESS:
      return state.merge({
        authenticated: true,
        authenticating: false,
        authenticationError: false,
      });
    case userActionTypes.SIGN_IN.FAILURE:
      return state.merge({
        authenticated: false,
        authenticating: false,
        authenticationError: true,
      });
    default:
      return state;
  }
}
