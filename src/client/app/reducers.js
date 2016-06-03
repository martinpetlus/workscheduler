import { combineReducers } from 'redux';

import home from '../home/homeReducer';

const rootReducer = combineReducers({
  home,
});

export default rootReducer;
