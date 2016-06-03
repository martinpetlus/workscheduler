import { Map } from 'immutable';

const initialState = Map();

export default function homeReducer(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}
