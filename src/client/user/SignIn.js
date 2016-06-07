import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { pure, compose } from 'recompose';
import CSSModules from 'react-css-modules';

import { actionCreators } from './userActions';
import styles from './SignIn.scss';

export function SignIn({ signIn }) {
  return (
    <div>
      <button onClick={() => signIn({})}>Sign in</button>
    </div>
  );
}

SignIn.propTypes = {
  signIn: PropTypes.func.isRequired,
};

export default compose(
  connect(null, actionCreators),
  pure,
  CSSModules
)(SignIn, styles);
