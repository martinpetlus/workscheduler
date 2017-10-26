import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import PrivateRoute from 'containers/PrivateRoute';
import withWindowTitle from 'components/withWindowTitle';
import { withSidebar } from 'components/LayoutWrappers';
import NewWorkSchedulePage from './NewWorkSchedulePage';
import WorkSchedulesOverviewPage from './WorkSchedulesOverviewPage';

const WorkSchedulesPage = ({ match }) => (
  <div>
    <PrivateRoute exact path={match.url} component={WorkSchedulesOverviewPage} />
    <PrivateRoute path={`${match.url}/new`} component={NewWorkSchedulePage} />
  </div>
);

WorkSchedulesPage.propTypes = {
  match: PropTypes.shape({
    url: PropTypes.string.isRequired,
  }).isRequired,
};

export default compose(
  withRouter,
  withWindowTitle('Work Schedules'),
  withSidebar,
)(WorkSchedulesPage);
