import React from 'react';
import { compose } from 'recompose';
import { reduxForm, Field, propTypes } from 'redux-form';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import Button from 'components/Button';
import FormGroupSeparator from 'components/FormGroupSeparator';
import { renderFormGroup, required, email, minLength } from 'utils/reduxForm';
import { actionCreators } from './UserActions';

const ButtonsWrapper = styled.div`
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
      name="email"
      type="text"
      component={renderFormGroup}
      label="Email"
      validate={[required, email]}
    />
    <FormGroupSeparator />
    <Field
      name="password"
      type="password"
      component={renderFormGroup}
      label="Password"
      validate={[required, minLength(5)]}
    />
    <ButtonsWrapper>
      <Button type="submit" disabled={submitting}>Sign in</Button>
    </ButtonsWrapper>
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
