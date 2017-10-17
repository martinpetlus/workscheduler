import axios from 'axios';
import { createAction } from 'redux-actions';

import createRequestActionTypes from 'utils/createRequestActionTypes';

const SIGN_IN = 'SIGN_IN';

export const actionTypes = createRequestActionTypes(SIGN_IN);

export const actionCreators = {
  signIn: createAction(
    SIGN_IN,
    (nextPathname, credentials) => axios.post('/signin', credentials),
    (nextPathname) => ({ nextPathname })
  ),
};
