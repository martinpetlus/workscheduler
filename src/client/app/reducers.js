import { combineReducers } from 'redux';

import home from '../home/homeReducer';
import user from '../user/userReducer';

const rootReducer = combineReducers({
  home,
  user,
});

export default rootReducer;
