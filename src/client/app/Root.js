import React, { PropTypes } from 'react';
import { Router, Route, IndexRoute } from 'react-router';
import { Provider } from 'react-redux';
import { injectGlobal, ThemeProvider } from 'styled-components';

import App from 'containers/App';
import Home from 'pages/Home';
import SignIn from 'pages/SignIn';
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
  headerHeight: 35,
};

const Root = ({ store, history }) => {
  const requireAuth = requireAuthFactory(store);

  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <Router history={history}>
          <Route path="/" component={App}>
            <IndexRoute onEnter={requireAuth} component={Home} />
            <Route path="signin" component={SignIn} />
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
