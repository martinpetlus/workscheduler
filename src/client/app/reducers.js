import { combineReducers } from 'redux-immutable';
import { reducer as form } from 'redux-form/immutable';

import home, * as fromHome from '../home/homeReducer';
import user from '../user/userReducer';

const rootReducer = combineReducers({
  home,
  user,
  form,
});

export default rootReducer;

export const getUser = (state) => state.get('user');

export const getWorkSchedule = (state) =>
  fromHome.getWorkSchedule(state.get('home'));
