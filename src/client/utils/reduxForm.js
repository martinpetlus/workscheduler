import React, { PropTypes } from 'react';

import Input from 'components/Input';
import FormGroup from 'components/FormGroup';

const renderFormGroup = ({
  id,
  input,
  label,
  type,
  meta: { touched, error, warning },
}) => (
  <FormGroup
    id={id}
    label={label}
    error={touched && error}
    warning={touched && warning}
  >
    <Input {...input} id={id} placeholder={label} type={type} />
  </FormGroup>
);

renderFormGroup.propTypes = {
  id: PropTypes.string.isRequired,
  input: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  meta: PropTypes.shape({
    touched: PropTypes.bool.isRequired,
    error: PropTypes.string,
    warning: PropTypes.string,
  }),
};

export { renderFormGroup };

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

export const maxLength = max => value => (
  value && value.length > max
    ? `Must be ${max} characters or less`
    : undefined
);

export const number = value => (
  value && isNaN(Number(value))
    ? 'Must be a number'
    : undefined
);

export const minValue = min => value => (
  value && value < min
    ? `Must be at least ${min}`
    : undefined
);

export const maxValue = max => value => (
  value && value < max
    ? `Must be at maximum ${max}`
    : undefined
);
