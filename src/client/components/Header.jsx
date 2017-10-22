import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Button from './Button';

const StyledHeader = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  padding: 10px;
  height: ${props => props.theme.headerHeight}px;
  border-bottom: 1px solid black;
  display: flex;
  justify-content: space-between;
`;

const Header = ({ user, onSignOutClick, authenticated }) => (
  <StyledHeader>
    <span>{user && user.name}</span>
    {authenticated && <Button onClick={onSignOutClick}>Sign out</Button>}
  </StyledHeader>
);

Header.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }),
  onSignOutClick: PropTypes.func.isRequired,
  authenticated: PropTypes.bool.isRequired,
};

Header.defaultProps = {
  user: null,
};

export default Header;
