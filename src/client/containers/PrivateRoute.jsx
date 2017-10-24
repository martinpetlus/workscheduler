import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect as ReactRouterRedirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'recompose';

import { getIsAuthenticated } from 'modules/user';

const Redirect = ({ location }) => (
  <ReactRouterRedirect
    to={{
      pathname: '/signin',
      state: { from: location },
    }}
  />
);

Redirect.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }),
};

Redirect.defaultProps = {
  location: {
    pathname: '/',
  },
};

const PrivateRoute = ({ authenticated, component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => (
      authenticated
        ? <Component {...props} />
        : <Redirect {...props} />
    )}
  />
);

PrivateRoute.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  component: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  authenticated: getIsAuthenticated(state),
});

export default compose(
  withRouter,
  connect(mapStateToProps),
)(PrivateRoute);
