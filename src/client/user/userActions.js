import axios from 'axios';
import { createAction } from 'redux-actions';

import createRequestActionTypes from '../app/utils/createRequestActionTypes';

const SIGN_IN = 'SIGN_IN';

export const actionTypes = {
  [SIGN_IN]: createRequestActionTypes(SIGN_IN),
};

export const actionCreators = {
  signIn: createAction(
    SIGN_IN,
    (credentials) => ({
      promise: axios.post('/api/signin', credentials),
    })
  ),
};
