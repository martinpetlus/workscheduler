import { actionTypes } from './UserActions';

const initialState = {
  nick: null,
  name: null,
  email: null,
  authenticated: false,
  authenticating: false,
  authenticationError: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SIGN_IN.REQUEST:
      return {
        ...state,
        authenticated: false,
        authenticating: true,
        authenticationError: null,
      };
    case actionTypes.SIGN_IN.SUCCESS: {
      return {
        ...action.payload.data,
        authenticated: true,
        authenticating: false,
      };
    }
    case actionTypes.SIGN_IN.FAILURE: {
      return {
        ...initialState,
        authenticationError: action.payload,
      };
    }
    case actionTypes.SIGN_OUT.SUCCESS:
      return initialState;
    default:
      return state;
  }
};

export const getIsAuthenticated = state => state.authenticated;

export const getUser = state => (state.authenticated ? state : null);
