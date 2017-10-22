import React from 'react';
import PropTypes from 'prop-types';

const ModalDialog = ({ children }) => (
  <div>{children}</div>
);

ModalDialog.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ModalDialog;
