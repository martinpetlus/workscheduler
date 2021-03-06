import React from 'react';
import PropTypes from 'prop-types';
import { fieldPropTypes } from 'redux-form';
import memoize from 'lodash.memoize';

import Input from 'components/Input';
import FormGroup from 'components/FormGroup';

const renderFormGroup = ({
  input,
  meta: { touched, error, warning },
  id,
  label,
  type,
  placeholder,
}) => (
  <FormGroup
    id={id}
    label={label}
    error={touched && error}
    warning={touched && warning}
  >
    <Input {...input} id={id} placeholder={placeholder || label} type={type} />
  </FormGroup>
);

renderFormGroup.propTypes = {
  ...fieldPropTypes,
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  // eslint-disable-next-line react/require-default-props
  placeholder: PropTypes.string,
};

export { renderFormGroup };

export const required = value => (value ? undefined : 'Required');

export const email = value => (
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Invalid email address'
    : undefined
);

export const minLength = memoize(min => value => (
  value && value.length < min
    ? `Must be ${min} characters or more`
    : undefined
));

export const maxLength = memoize(max => value => (
  value && value.length > max
    ? `Must be ${max} characters or less`
    : undefined
));

export const number = value => (
  value && Number.isNaN(Number(value))
    ? 'Must be a number'
    : undefined
);

export const minValue = memoize(min => value => (
  value && Number(value) < min
    ? `Must be at least ${min}`
    : undefined
));

export const maxValue = memoize(max => value => (
  value && Number(value) > max
    ? `Must be at maximum ${max}`
    : undefined
));
