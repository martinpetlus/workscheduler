import axios from 'axios';
import { createAction } from 'redux-actions';

import createRequestActionTypes from 'utils/createRequestActionTypes';

const SIGN_IN = 'SIGN_IN';
const SIGN_OUT = 'SIGN_OUT';

export const actionTypes = createRequestActionTypes([
  SIGN_IN,
  SIGN_OUT,
]);

export const actionCreators = {
  signIn: createAction(
    SIGN_IN,
    credentials => axios.post('/api/signin', credentials),
  ),
  signOut: createAction(
    SIGN_OUT,
    () => axios.get('/api/signout'),
    () => ({ nextPathname: '/signin' }),
  ),
};
