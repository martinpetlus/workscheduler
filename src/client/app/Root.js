import React, { PropTypes } from 'react';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import { Provider } from 'react-redux';

import App from './App';
import Home from '../home/Home';
import SignIn from '../user/SignIn';
import Schedule from '../schedule/Schedule';
import requireAuthFactory from '../user/requireAuthFactory';

function Root({ store }) {
  const requireAuth = requireAuthFactory(store);

  return (
    <Provider {...{ store }}>
      <Router history={hashHistory}>
        <Route path="/" component={App}>
          <IndexRoute onEnter={requireAuth} component={Home} />
          <Route path="signin" component={SignIn} />
          <Route path="schedule" onEnter={requireAuth} component={Schedule} />
        </Route>
      </Router>
    </Provider>
  );
}

Root.propTypes = {
  store: PropTypes.object.isRequired,
};

export default Root;
