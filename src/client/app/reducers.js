import { combineReducers } from 'redux-immutable';
import { reducer as formReducer } from 'redux-form';
import { fromJS } from 'immutable';

import home, * as fromHome from '../home/homeReducer';
import user from '../user/userReducer';

const rootReducer = combineReducers({
  home,
  user,
  form: (state, action) => (
    fromJS(formReducer(state && state.toJS(), action))
  ),
});

export default rootReducer;

export const getWorkSchedule = (state) =>
  fromHome.getWorkSchedule(state.get('home'));
