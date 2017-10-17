import React, { PropTypes } from 'react';
import styled from 'styled-components';

const StyledHeader = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  padding: 10px;
  height: ${(props) => props.theme.headerHeight}px;
  border-bottom: 1px solid black;
`;

const Header = ({ user }) => (
  <StyledHeader>
    {user.name}
  </StyledHeader>
);

Header.propTypes = {
  user: PropTypes.object.isRequired,
};

export default Header;
