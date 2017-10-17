import React, { PropTypes } from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import { injectGlobal, ThemeProvider } from 'styled-components';

import App from 'containers/App';
import Home from 'pages/Home';
import SignIn from 'pages/SignIn';
// import Schedule from '../schedule/Schedule';
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

const Root = ({ store }) => {
  const requireAuth = requireAuthFactory(store);

  return (
    <ThemeProvider theme={theme}>
      <Provider {...{ store }}>
        <Router history={browserHistory}>
          <Route path="/" component={App}>
            <IndexRoute onEnter={requireAuth} component={Home} />
            <Route path="signin" component={SignIn} />
            {/* <Route path="schedule" onEnter={requireAuth} component={Schedule} /> */}
          </Route>
        </Router>
      </Provider>
    </ThemeProvider>
  );
};

Root.propTypes = {
  store: PropTypes.object.isRequired,
};

export default Root;
