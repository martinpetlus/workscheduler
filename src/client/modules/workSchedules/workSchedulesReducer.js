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
    case actionTypes.NEW_WORK_SCHEDULE.SUCCESS:
      return {
        ...state,
        [payload.data.id]: payload.data,
      };
    default:
      return state;
  }
};

const allIds = (state = [], { type, payload }) => {
  switch (type) {
    case actionTypes.FETCH_WORK_SCHEDULES.SUCCESS:
      return payload.data.map(workSchedule => workSchedule.id);
    case actionTypes.NEW_WORK_SCHEDULE.SUCCESS:
      return [...state, payload.data.id];
    default:
      return state;
  }
};

export default combineReducers({
  byId,
  allIds,
});

export const getWorkSchedules = state => state.allIds.map(id => state.byId[id]);
