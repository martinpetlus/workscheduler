import React, { PropTypes } from 'react';
import AppBar from 'material-ui/AppBar';
import { compose } from 'recompose';
import { connect } from 'react-redux';

import WorkSchedule from './WorkSchedule';
import { actionCreators } from '../app/App/actions';

export function Home(props) {
  return (
    <div>
      <AppBar
        title="Home"
        onLeftIconButtonTouchTap={props.openDrawer}
      />
      <WorkSchedule />
    </div>
  );
}

Home.propTypes = {
  openDrawer: PropTypes.func.isRequired,
};

export default compose(
  connect(null, actionCreators)
)(Home);
