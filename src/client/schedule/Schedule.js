import React, { PropTypes } from 'react';
import { pure, compose } from 'recompose';
import { connect } from 'react-redux';

import CreateSchedule from './CreateSchedule';
import { isScheduleCreating } from './scheduleReducer';
import { scheduleSelector } from '../app/reducers';

export function Schedule({
  creating,
}) {
  return (
    <div>
      {creating && 'Schedule creation in progress'}
      <CreateSchedule />
    </div>
  );
}

Schedule.propTypes = {
  creating: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
  return {
    creating: isScheduleCreating(scheduleSelector(state)),
  };
}

export default compose(
  connect(mapStateToProps),
  pure
)(Schedule);
