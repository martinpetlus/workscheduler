import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getIsAuthenticated } from 'modules/user';
import { WithSidebar, WithoutSidebar } from 'components/PageContentWrappers';
import Header from './Header';
import Sidebar from './Sidebar';

const App = ({ children, authenticated }) => (
  <div>
    <Header />
    {authenticated && <Sidebar />}
    {authenticated &&
      <WithSidebar>
        {children}
      </WithSidebar>
    }
    {!authenticated &&
      <WithoutSidebar>
        {children}
      </WithoutSidebar>
    }
  </div>
);

App.propTypes = {
  children: PropTypes.node.isRequired,
  authenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  authenticated: getIsAuthenticated(state),
});

export default connect(mapStateToProps)(App);
