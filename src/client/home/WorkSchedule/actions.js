import axios from 'axios';
import { createAction } from 'redux-actions';

import createRequestActionTypes from '../../app/utils/createRequestActionTypes';

const WORK_SCHEDULE = 'WORK_SCHEDULE';

export const actionTypes = createRequestActionTypes(WORK_SCHEDULE);

export const actionCreators = {
  fetch: createAction(WORK_SCHEDULE, () => axios.get('/workschedule')),
};
