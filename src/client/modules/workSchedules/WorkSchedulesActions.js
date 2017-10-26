import axios from 'axios';
import { createAction } from 'redux-actions';

import createRequestActionTypes from 'utils/createRequestActionTypes';

const NEW_WORK_SCHEDULE = 'NEW_WORK_SCHEDULE';
const FETCH_WORK_SCHEDULES = 'FETCH_WORK_SCHEDULES';

export const actionTypes = createRequestActionTypes([
  NEW_WORK_SCHEDULE,
  FETCH_WORK_SCHEDULES,
]);

export const actionCreators = {
  fetchWorkSchedules: createAction(
    FETCH_WORK_SCHEDULES,
    () => axios.get('/api/workschedules'),
  ),

  newWorkSchedule: createAction(
    NEW_WORK_SCHEDULE,
    options => axios.post('/api/workschedules/new', options),
  ),
};
