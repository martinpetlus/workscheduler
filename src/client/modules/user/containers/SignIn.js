import React from 'react';
import { compose } from 'recompose';
import { reduxForm, Field, propTypes } from 'redux-form';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import Button from 'components/Button';
import FormGroupSeparator from 'components/FormGroupSeparator';
import { renderFormGroup, required, email } from 'utils/reduxForm';
import { actionCreators } from '../UserActions';

const FormFooter = styled.div`
  padding-top: 20px;
  text-align: right;
`;

const SignIn = ({
  handleSubmit,
  submitting,
  signIn,
  location: { state },
}) => (
  <form
    onSubmit={handleSubmit(signIn.bind(null, (state && state.nextPathname) || '/'))}
  >
    <h2>Sign in</h2>
    <hr />
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
      <Button type="submit" disabled={submitting}>Sign in</Button>
    </FormFooter>
  </form>
);

SignIn.propTypes = {
  ...propTypes,
};

export default compose(
  withRouter,
  reduxForm({ form: 'signIn' }),
  connect(null, actionCreators)
)(SignIn);
