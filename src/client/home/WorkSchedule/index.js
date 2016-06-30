import React, { PropTypes } from 'react';
import { compose, pure } from 'recompose';
import { connect } from 'react-redux';

import { getWorkSchedule } from '../../app/reducers';

export function WorkSchedule({ workSchedule }) {
  const { weeks } = workSchedule.toJS();

  return (
    <div>
      {weeks.map((week) => (
        <div>{week}</div>
      ))}
    </div>
  );
}

WorkSchedule.propTypes = {
  workSchedule: PropTypes.object.isRequired,
};

export default compose(
  connect((state) => ({
    workSchedule: getWorkSchedule(state),
  })),
  pure
)(WorkSchedule);
