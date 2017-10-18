import React from 'react';
import { compose } from 'recompose';

import withWindowTitle from 'components/withWindowTitle';
import { SignInForm } from 'modules/user';

const SignInPage = () => (
  <div>
    <h2>Sign in</h2>
    <hr />
    <SignInForm />
  </div>
);

export default compose(
  withWindowTitle('Sign In')
)(SignInPage);
