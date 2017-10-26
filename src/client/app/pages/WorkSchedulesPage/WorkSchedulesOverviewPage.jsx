import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'recompose';

import {
  actionCreators,
  getWorkSchedules,
  WorkScheduleOverview,
} from 'modules/workSchedules';
import withWindowTitle from 'components/withWindowTitle';

class WorkSchedulesOverviewPage extends Component {
  static propTypes = {
    workSchedules: PropTypes.arrayOf(PropTypes.object).isRequired,
    fetchWorkSchedules: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.fetchWorkSchedules();
  }

  render() {
    return (
      <div>
        <h2>Overview</h2>
        <section>
          {this.props.workSchedules.map(workSchedule => (
            <WorkScheduleOverview {...workSchedule} />
          ))}
        </section>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  workSchedules: getWorkSchedules(state),
});

export default compose(
  withWindowTitle('Work schedules overview'),
  connect(mapStateToProps, actionCreators),
)(WorkSchedulesOverviewPage);
