import { Map } from 'immutable';

import { actionTypes } from './userActions';

const initialState = Map({});

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}
