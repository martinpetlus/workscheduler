import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import Header from './Header';
import Sidebar from './Sidebar';
import { getIsAuthenticated } from 'modules/user';
import { WithSidebar, WithoutSidebar } from 'components/PageContentWrappers';

export function App({ children, authenticated }) {
  return (
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
}

App.propTypes = {
  children: PropTypes.node.isRequired,
  authenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  authenticated: getIsAuthenticated(state),
});

export default connect(mapStateToProps)(App);
