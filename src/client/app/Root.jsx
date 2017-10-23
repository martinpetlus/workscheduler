import React from 'react';
import PropTypes from 'prop-types';
import { Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { injectGlobal, ThemeProvider } from 'styled-components';

import App from 'containers/App';
import PrivateRoute from 'containers/PrivateRoute';
import HomePage from 'pages/HomePage';
import SignInPage from 'pages/SignInPage';
import WorkSchedulesPage from 'pages/WorkSchedulesPage';

// eslint-disable-next-line no-unused-expressions
injectGlobal`
  html, body {
    margin: 0;
  }

  html {
    box-sizing: border-box;
  }

  *, *:before, *:after {
    box-sizing: inherit;
  }
`;

const theme = {
  headerHeight: 42,
  sidebarWidth: 300,
};

const Root = ({ store, history }) => (
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <Router history={history}>
        <App>
          <PrivateRoute exact path="/" component={HomePage} />
          <Route path="/signin" component={SignInPage} />
          <PrivateRoute path="/workschedules" component={WorkSchedulesPage} />
        </App>
      </Router>
    </Provider>
  </ThemeProvider>
);

Root.propTypes = {
  store: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  history: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default Root;
