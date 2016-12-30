import { combineReducers } from 'redux-immutable';
import { reducer as form } from 'redux-form/immutable';

import home, * as fromHome from '../home/homeReducer';
import user from '../user/userReducer';
import schedule from '../schedule/scheduleReducer';

const rootReducer = combineReducers({
  home,
  user,
  form,
  schedule,
});

export default rootReducer;

export const userSelector = (state) => state.get('user');

export const scheduleSelector = state => state.get('schedule');

export const getWorkSchedule = (state) =>
  fromHome.getWorkSchedule(state.get('home'));
