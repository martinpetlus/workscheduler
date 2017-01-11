import React, { PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import injectTapEventPlugin from 'react-tap-event-plugin';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import { Link } from 'react-router';
import { compose } from 'recompose';
import { connect } from 'react-redux';

import styles from './styles.scss';
import { appSelector } from '../reducers';
import { isDrawerOpen } from './reducer';

export function App(props) {
  return (
    <MuiThemeProvider muiTheme={getMuiTheme()}>
      <div>
        <Drawer open={props.drawerOpen}>
          <MenuItem>
            <Link to="/schedule">Manage schedules</Link>
          </MenuItem>
        </Drawer>
        {props.children}
      </div>
    </MuiThemeProvider>
  );
}

App.propTypes = {
  children: PropTypes.node.isRequired,
  drawerOpen: PropTypes.bool.isRequired,
};

injectTapEventPlugin();

export default compose(
  connect((state) => ({
    drawerOpen: isDrawerOpen(appSelector(state)),
  })),
  CSSModules
)(App, styles);
