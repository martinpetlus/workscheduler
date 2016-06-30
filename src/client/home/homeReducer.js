import { combineReducers } from 'redux-immutable';

import workSchedule from './WorkSchedule/reducer';

export default combineReducers({
  workSchedule,
});

export const getWorkSchedule = (state) =>
  state.get('workSchedule');
