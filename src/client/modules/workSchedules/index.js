import globalizeSelector from 'utils/globalizeSelector';
import localStateFactory from 'utils/localStateFactory';
import reducer, * as fromReducer from './workSchedulesReducer';
import NewWorkScheduleForm from './containers/NewWorkScheduleForm';
import WorkScheduleOverview from './components/WorkScheduleOverview';

const moduleName = 'workSchedules';

const localState = localStateFactory(moduleName);

export const getWorkSchedules = globalizeSelector(localState, fromReducer.getWorkSchedules);

export { actionCreators, actionTypes } from './WorkSchedulesActions';

export {
  moduleName,
  reducer,
  NewWorkScheduleForm,
  WorkScheduleOverview,
};
