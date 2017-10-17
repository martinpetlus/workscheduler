import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';

import {
  reducer as userReducer,
  moduleName as userModuleName,
} from 'modules/user';

export default combineReducers({
  form,
  [userModuleName]: userReducer,
});
