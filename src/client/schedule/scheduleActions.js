import axios from 'axios';
import { createAction } from 'redux-actions';

import createRequestActionTypes from '../app/utils/createRequestActionTypes';

const CREATE_SCHEDULE = 'CREATE_SCHEDULE';

export const actionTypes = createRequestActionTypes(CREATE_SCHEDULE);

export const actionCreators = {
  createSchedule: createAction(
    CREATE_SCHEDULE,
    (options) => axios.post('/workschedule', options)
  ),
};
