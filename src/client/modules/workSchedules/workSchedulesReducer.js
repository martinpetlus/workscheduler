import { combineReducers } from 'redux';

import { actionTypes } from './WorkSchedulesActions';

const byId = (state = {}, { type, payload }) => {
  switch (type) {
    case actionTypes.FETCH_WORK_SCHEDULES.SUCCESS:
      return payload.data.reduce(
        (nextState, workSchedule) => {
          // eslint-disable-next-line no-param-reassign
          nextState[workSchedule.id] = workSchedule;
          return nextState;
        },
        {},
      );
    default:
      return state;
  }
};

const allIds = (state = [], { type, payload }) => {
  switch (type) {
    case actionTypes.FETCH_WORK_SCHEDULES.SUCCESS:
      return payload.data.map(workSchedule => workSchedule.id);
    default:
      return state;
  }
};

export default combineReducers({
  byId,
  allIds,
});

export const getWorkSchedules = state => state.allIds.map(id => state.byId[id]);
