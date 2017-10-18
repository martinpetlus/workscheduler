import React, { PropTypes } from 'react';
import { Router, Route, IndexRoute } from 'react-router';
import { Provider } from 'react-redux';
import { injectGlobal, ThemeProvider } from 'styled-components';

import App from 'containers/App';
import HomePage from 'pages/HomePage';
import SignInPage from 'pages/SignInPage';
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
          </Route>
        </Router>
      </Provider>
    </ThemeProvider>
  );
};

Root.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default Root;
