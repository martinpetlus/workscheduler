import React, { PropTypes } from 'react';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import { Provider } from 'react-redux';

import App from './App';
import Home from '../home/Home';
import SignIn from '../user/SignIn';
import requireAuthFactory from '../user/requireAuthFactory';

function Root({ store }) {
  const requireAuth = requireAuthFactory(store);

  return (
    <Provider {...{ store }}>
      <Router history={hashHistory}>
        <Route path="/" onEnter={requireAuth} component={App}>
          <IndexRoute component={Home} />
        </Route>
        <Route path="/signin" component={SignIn} />
      </Router>
    </Provider>
  );
}

Root.propTypes = {
  store: PropTypes.object.isRequired,
};

export default Root;
