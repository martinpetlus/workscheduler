import { actionTypes } from './UserActions';

const initialState = {
  id: null,
  name: null,
  email: null,
  token: null,
  expires: 0,
  authenticated: false,
  authenticating: false,
  authError: null,
};

const loadState = () => {
  // Number(null) = 0
  const expires = Number(localStorage.getItem('expires'));
  const expired = expires < Date.now();

  if (!expired) {
    return {
      ...initialState,
      id: Number(localStorage.getItem('id')),
      name: localStorage.getItem('name'),
      email: localStorage.getItem('email'),
      token: localStorage.getItem('token'),
      expires,
      authenticated: true,
    };
  }

  return initialState;
};

export default (state = loadState(), action) => {
  switch (action.type) {
    case actionTypes.SIGN_IN.REQUEST:
      return {
        ...state,
        authenticated: false,
        authenticating: true,
        authError: null,
      };
    case actionTypes.SIGN_IN.SUCCESS: {
      return {
        ...action.payload.data,
        authenticated: true,
        authenticating: false,
        authError: null,
      };
    }
    case actionTypes.SIGN_IN.FAILURE: {
      return {
        ...initialState,
        authError: action.payload,
      };
    }
    case actionTypes.SIGN_OUT.SUCCESS:
      return initialState;
    default:
      return state;
  }
};

export const getIsAuthenticated = (state) => {
  const { authenticated, expires } = state;

  if (!authenticated || expires < Date.now()) return false;

  return true;
};

export const getUser = state => (state.authenticated ? state : null);
