import axios from 'axios';
import { createAction } from 'redux-actions';

import createRequestActionTypes from 'utils/createRequestActionTypes';

const NEW_WORK_SCHEDULE = 'NEW_WORK_SCHEDULE';

export const actionTypes = createRequestActionTypes(NEW_WORK_SCHEDULE);

export const actionCreators = {
  newWorkSchedule: createAction(
    NEW_WORK_SCHEDULE,
    options => axios.post('/api/workschedules/new', options),
  ),
};
