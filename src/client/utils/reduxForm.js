import React, { PropTypes } from 'react';

import Input from 'components/Input';
import InputRow from 'components/InputRow';

const renderInputRow = ({
  input,
  label,
  type,
  meta: { touched, error, warning },
}) => (
  <InputRow
    label={label}
    error={touched && error}
    warning={touched && warning}
  >
    <Input {...input} placeholder={label} type={type} />
  </InputRow>
);

renderInputRow.propTypes = {
  input: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  meta: PropTypes.shape({
    touched: PropTypes.bool.isRequired,
    error: PropTypes.string,
    warning: PropTypes.string,
  }),
};

export { renderInputRow };

export const required = value => (value ? undefined : 'Required');

export const email = value => (
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Invalid email address'
    : undefined
);

export const minLength = min => value => (
  value && value.length < min
    ? `Must be ${min} characters or more`
    : undefined
);
