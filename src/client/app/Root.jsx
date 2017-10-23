import React from 'react';
import PropTypes from 'prop-types';
import { Router, Route, IndexRoute } from 'react-router';
import { Provider } from 'react-redux';
import { injectGlobal, ThemeProvider } from 'styled-components';

import App from 'containers/App';
import HomePage from 'pages/HomePage';
import SignInPage from 'pages/SignInPage';
import WorkSchedulesPage from 'pages/WorkSchedulesPage';
import requireAuthFactory from 'modules/user/requireAuthFactory';

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

const Root = ({ store, history }) => {
  const requireAuth = requireAuthFactory(store);

  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <Router history={history}>
          <Route path="/" component={App}>
            <IndexRoute onEnter={requireAuth} component={HomePage} />
            <Route path="signin" component={SignInPage} />
            <Route path="workschedules" onEnter={requireAuth} component={WorkSchedulesPage} />
          </Route>
        </Router>
      </Provider>
    </ThemeProvider>
  );
};

Root.propTypes = {
  store: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  history: PropTypes.object.isRequired,
};

export default Root;
