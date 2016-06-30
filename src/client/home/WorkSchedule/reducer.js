import { fromJS } from 'immutable';

const initialState = fromJS({
  weeks: [],
});

export default function workScheduleReducer(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}
