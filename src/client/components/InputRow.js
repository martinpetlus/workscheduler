import React, { PropTypes } from 'react';
import styled from 'styled-components';

const Warning = styled.div`
  color: yellow;
  text-align: right;
`;

const Error = styled.div`
  color: red;
  text-align: right;
`;

const StyledInputRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
`;

const InputRow = ({ label, children, error, warning }) => (
  <div>
    <StyledInputRow>
      <label>{label}</label>
      {children}
    </StyledInputRow>
    {error && <Error>{error}</Error>}
    {!error && warning && <Warning>{warning}</Warning>}
  </div>
);

InputRow.propTypes = {
  label: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  error: PropTypes.string,
  warning: PropTypes.string,
};

export default InputRow;
