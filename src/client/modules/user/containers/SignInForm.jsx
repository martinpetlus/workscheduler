import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { reduxForm, Field, propTypes as reduxFormPropTypes } from 'redux-form';
import { connect } from 'react-redux';

import Button from 'components/Button';
import FormGroupSeparator from 'components/FormGroupSeparator';
import FormFooter from 'components/FormFooter';
import { renderFormGroup, required, email } from 'utils/reduxForm';
import { actionCreators } from '../UserActions';

const SignInForm = ({
  handleSubmit,
  pristine,
  submitting,
  signIn,
}) => (
  <form onSubmit={handleSubmit(signIn)}>
    <Field
      id="signin-email"
      name="email"
      type="text"
      label="Email"
      component={renderFormGroup}
      validate={[required, email]}
    />
    <FormGroupSeparator />
    <Field
      id="signin-password"
      name="password"
      type="password"
      label="Password"
      component={renderFormGroup}
      validate={[required]}
    />
    <FormFooter>
      <Button type="submit" disabled={pristine || submitting}>Sign in</Button>
    </FormFooter>
  </form>
);

SignInForm.propTypes = {
  ...reduxFormPropTypes,
  signIn: PropTypes.func.isRequired,
  onSubmitSuccess: PropTypes.func.isRequired,
};

export default compose(
  reduxForm({
    form: 'signIn',
    onSubmitSuccess: (result, dispatch, ownProps) => {
      ownProps.onSubmitSuccess();
    },
  }),
  connect(null, actionCreators),
)(SignInForm);
