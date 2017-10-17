import React, { PropTypes } from 'react';
// import injectTapEventPlugin from 'react-tap-event-plugin';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import styled from 'styled-components';

import HeaderContainer from './HeaderContainer';

const ContentWrapper = styled.div`
  width: 700px;
  margin: 0 auto;
  padding-top: ${(props) => props.theme.headerHeight}px;
`;

export function App({ children }) {
  return (
    <div>
      <HeaderContainer />
      {/* <Link to="/schedule">Manage work schedules</Link> */}
      <ContentWrapper>
        {children}
      </ContentWrapper>
    </div>
  );
}

App.propTypes = {
  children: PropTypes.node.isRequired,
};

// injectTapEventPlugin();

export default connect()(App);
