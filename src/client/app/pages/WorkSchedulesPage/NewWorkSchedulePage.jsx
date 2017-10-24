import React from 'react';
import { compose } from 'recompose';

import { NewWorkScheduleForm } from 'modules/workSchedules';
import withWindowTitle from 'components/withWindowTitle';
import { withSidebar } from 'components/LayoutWrappers';

const NewWorkSchedulePage = () => (
  <div>
    <h2>Create new schedule</h2>
    <hr />
    <NewWorkScheduleForm />
  </div>
);

export default compose(
  withWindowTitle('New Work Schedule'),
  withSidebar,
)(NewWorkSchedulePage);
