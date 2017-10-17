import localStateFactory from 'utils/localStateFactory';
import globalizeSelector from 'utils/globalizeSelector';
import reducer, * as fromReducer from './userReducer';
import requireAuthFactory from './requireAuthFactory';
import SignInContainer from './SignInContainer';

const moduleName = 'user';

const localState = localStateFactory(moduleName);

const getIsAuthenticated = globalizeSelector(localState, fromReducer.getIsAuthenticated);
const getUser = globalizeSelector(localState, fromReducer.getUser);

export { actionCreators, actionTypes } from './UserActions';

export {
  moduleName,
  reducer,
  requireAuthFactory,
  getIsAuthenticated,
  getUser,
  SignInContainer,
};

