import { Map } from 'immutable';

import { actionTypes } from './userActions';

const initialState = Map({
  id: localStorage.getItem('id'),
  name: localStorage.getItem('name'),
  email: localStorage.getItem('email'),
  authenticated: JSON.parse(localStorage.getItem('authenticated')),
  authenticating: false,
  authenticationError: null,
});

const saveUserToStorage = user => {
  const { id, name, email, authenticated } = user.toJSON();
  localStorage.setItem('id', id);
  localStorage.setItem('name', name);
  localStorage.setItem('email', email);
  localStorage.setItem('authenticated', authenticated);
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.SIGN_IN.REQUEST:
      return state.merge({
        ...state.toJSON(),
        authenticated: false,
        authenticating: true,
        authenticationError: null,
      });
    case actionTypes.SIGN_IN.SUCCESS: {
      const nextState = state.merge({
        ...action.payload.data,
        authenticated: true,
        authenticating: false,
      });
      saveUserToStorage(nextState);
      return nextState;
    }
    case actionTypes.SIGN_IN.FAILURE: {
      const nextState = state.merge({
        id: null,
        name: null,
        email: null,
        authenticated: false,
        authenticating: false,
        authenticationError: action.payload.data,
      });
      saveUserToStorage(nextState);
      return nextState;
    }
    default:
      return state;
  }
}
