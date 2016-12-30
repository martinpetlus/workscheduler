import { Map } from 'immutable';

import { actionTypes } from './scheduleActions';

const initialState = Map({
  creating: false,
});

export default function scheduleReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.CREATE_SCHEDULE.SUCCESS:
      return state.set('creating', true);
    default:
      return state;
  }
}

export function isScheduleCreating(state) {
  return state.get('creating');
}
