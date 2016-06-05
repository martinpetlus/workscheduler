import React from 'react';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';

import App from './App';
import Home from '../home/Home';
import SignIn from '../user/SignIn';

export default function Root() {
  return (
    <Router history={hashHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Home} />
      </Route>
      <Route path="/signin" component={SignIn} />
    </Router>
  );
}
