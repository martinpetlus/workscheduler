import React from 'react';
import { compose } from 'recompose';

import withWindowTitle from 'components/withWindowTitle';

const WorkSchedulesOverviewPage = () => (
  <div>
    <h2>Overview</h2>
  </div>
);

export default compose(withWindowTitle('Work schedules overview'))(WorkSchedulesOverviewPage);
