import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { pure } from 'recompose';

import { actionCreators } from './userActions';

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

export default connect(null, actionCreators)(pure(SignIn));
