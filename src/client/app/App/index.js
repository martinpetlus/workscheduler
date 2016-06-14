import React, { PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import injectTapEventPlugin from 'react-tap-event-plugin';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import styles from './styles.scss';

export function App({ children }) {
  return (
    <MuiThemeProvider muiTheme={getMuiTheme()}>
      {children}
    </MuiThemeProvider>
  );
}

App.propTypes = {
  children: PropTypes.node.isRequired,
};

injectTapEventPlugin();

export default CSSModules(App, styles);
