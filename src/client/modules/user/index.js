import localStateFactory from 'utils/localStateFactory';
import globalizeSelector from 'utils/globalizeSelector';
import reducer, * as fromReducer from './userReducer';
import SignInForm from './containers/SignInForm';

const moduleName = 'user';

const localState = localStateFactory(moduleName);

const getIsAuthenticated = globalizeSelector(localState, fromReducer.getIsAuthenticated);
const getUser = globalizeSelector(localState, fromReducer.getUser);

export { actionCreators, actionTypes } from './UserActions';

export {
  moduleName,
  reducer,
  getIsAuthenticated,
  getUser,
  SignInForm,
};

