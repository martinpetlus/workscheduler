import React from 'react';
import PropTypes from 'prop-types';

const WorkScheduleOverview = ({ name }) => (
  <div>
    <h4>{name}</h4>
  </div>
);

WorkScheduleOverview.propTypes = {
  name: PropTypes.string.isRequired,
};

export default WorkScheduleOverview;
