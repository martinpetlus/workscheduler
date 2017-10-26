import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';

import {
  reducer as userReducer,
  moduleName as userModuleName,
} from 'modules/user';
import {
  reducer as workSchedulesReducer,
  moduleName as workSchedulesModuleName,
} from 'modules/workSchedules';

export default combineReducers({
  form,
  [userModuleName]: userReducer,
  [workSchedulesModuleName]: workSchedulesReducer,
});
