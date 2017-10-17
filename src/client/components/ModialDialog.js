import React, { PropTypes } from 'react';

const ModalDialog = ({ children }) => (
  <div>{children}</div>
);

ModalDialog.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ModalDialog;
