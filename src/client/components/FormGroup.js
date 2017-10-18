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

const StyledFormGroup = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
`;

const FormGroup = ({ id, label, children, error, warning }) => (
  <div>
    <StyledFormGroup>
      <label htmlFor={id}>{label}</label>
      {children}
    </StyledFormGroup>
    {error && <Error>{error}</Error>}
    {!error && warning && <Warning>{warning}</Warning>}
  </div>
);

FormGroup.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  error: PropTypes.string,
  warning: PropTypes.string,
};

export default FormGroup;
