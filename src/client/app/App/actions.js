import { createAction } from 'redux-actions';

const OPEN_DRAWER = 'OPEN_DRAWER';
const CLOSE_DRAWER = 'CLOSE_DRAWER';

export const actionTypes = {
  [OPEN_DRAWER]: OPEN_DRAWER,
  [CLOSE_DRAWER]: CLOSE_DRAWER,
};

export const actionCreators = {
  openDrawer: createAction(OPEN_DRAWER),
  closeDrawer: createAction(CLOSE_DRAWER),
};
