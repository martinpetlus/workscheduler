import React, { PropTypes } from 'react';
// import injectTapEventPlugin from 'react-tap-event-plugin';
import { connect } from 'react-redux';
import styled, { css } from 'styled-components';

import Header from './Header';
import Sidebar from './Sidebar';
import { getIsAuthenticated } from 'modules/user';

const centeredMixin = css`
  width: 700px;
  margin: 0 auto;
`;

const sidebarMixin = css`
  margin-left: ${(props) => props.theme.sidebarWidth}px;
`;

const ContentWrapper = styled.div`
  ${(props) => (!props.authenticated ? centeredMixin : '')}
  ${(props) => (props.authenticated ? sidebarMixin : '')}
  padding-top: ${(props) => props.theme.headerHeight}px;
`;

export function App({ children, authenticated }) {
  return (
    <div>
      <Header />
      {authenticated && <Sidebar />}
      <ContentWrapper>
        {children}
      </ContentWrapper>
    </div>
  );
}

App.propTypes = {
  children: PropTypes.node.isRequired,
  authenticated: PropTypes.bool.isRequired,
};

// injectTapEventPlugin();

const mapStateToProps = (state) => ({
  authenticated: getIsAuthenticated(state),
});

export default connect(mapStateToProps)(App);
