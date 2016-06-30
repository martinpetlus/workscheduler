import React, { PropTypes, Component } from 'react';
import { compose, pure } from 'recompose';
import { connect } from 'react-redux';

import { getWorkSchedule } from '../../app/reducers';
import { actionCreators } from './actions';

class WorkSchedule extends Component {
  componentDidMount() {
    this.props.fetch();
  }

  render() {
    const { weeks } = this.props.workSchedule.toJS();

    return (
      <div>
        {weeks.map((week) => (
          <div>{week}</div>
        ))}
      </div>
    );
  }
}

WorkSchedule.propTypes = {
  workSchedule: PropTypes.object.isRequired,
  fetch: PropTypes.func.isRequired,
};

export default compose(
  connect(
    (state) => ({
      workSchedule: getWorkSchedule(state),
    }),
    actionCreators
  ),
  pure
)(WorkSchedule);
