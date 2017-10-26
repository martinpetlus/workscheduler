import React from 'react';
import styled from 'styled-components';

import Link from './Link';

const Nav = styled.nav`
  position: fixed;
  top: ${props => props.theme.headerHeight}px;
  left: 0;
  bottom: 0;
  width: ${props => props.theme.sidebarWidth}px;
  background: #efefef;
  z-index: 1;
  padding-left: 10px;
`;

const Sidebar = () => (
  <Nav>
    <h4>
      <Link to="/workschedules">
        Work schedules overview
      </Link>
    </h4>
    <h4>
      <Link to="/workschedules/new">
        New Work Schedule
      </Link>
    </h4>
  </Nav>
);

export default Sidebar;
