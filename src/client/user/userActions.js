import axios from 'axios';
import { createAction } from 'redux-actions';

import createRequestActionTypes from '../app/utils/createRequestActionTypes';

const SIGN_IN = 'SIGN_IN';

export const userActionTypes = {
  [SIGN_IN]: createRequestActionTypes(SIGN_IN),
};

export const signIn = createAction(
  SIGN_IN,
  (credentials) => ({
    promise: axios.post('/api/signin', credentials),
  })
);
