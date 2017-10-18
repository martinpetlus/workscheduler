import React from 'react';
import { compose } from 'recompose';

import withWindowTitle from 'components/withWindowTitle';
import { SignIn } from 'modules/user';

const SignInPage = () => (
  <SignIn />
);

export default compose(
  withWindowTitle('Sign In')
)(SignInPage);
