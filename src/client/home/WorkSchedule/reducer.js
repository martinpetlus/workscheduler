import { fromJS } from 'immutable';

import { actionTypes } from './actions';

const initialState = fromJS({
  weeks: [],
});

export default function workScheduleReducer(state = initialState, { type, payload }) {
  switch (type) {
    case actionTypes.WORK_SCHEDULE.REQUEST:
      return state;
    case actionTypes.WORK_SCHEDULE.SUCCESS:
      return fromJS(payload.data);
    case actionTypes.WORK_SCHEDULE.FAILURE:
      return state;
    default:
      return state;
  }
}
