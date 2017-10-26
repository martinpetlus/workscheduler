import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';

import { NewWorkScheduleForm } from 'modules/workSchedules';
import withWindowTitle from 'components/withWindowTitle';

const NewWorkSchedulePage = ({ history }) => (
  <div>
    <h2>Create new schedule</h2>
    <hr />
    <NewWorkScheduleForm
      onSubmitSuccess={() => {
        history.push('/workschedules');
      }}
    />
  </div>
);

NewWorkSchedulePage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default compose(withWindowTitle('New Work Schedule'))(NewWorkSchedulePage);
