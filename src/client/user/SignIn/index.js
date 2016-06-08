import React, { PropTypes } from 'react';
import { compose } from 'recompose';
import CSSModules from 'react-css-modules';
import {
  reduxForm,
  propTypes as reduxFormPropTypes,
} from 'redux-form';

import { actionCreators } from '../userActions';
import schema from './schema';
import getFormState from '../../app/utils/getFormState';
import styles from './styles.scss';

export function SignIn({
  signIn,
  fields: { email, password },
  submitting,
  handleSubmit,
}) {
  return (
    <div>
      <form onSubmit={handleSubmit(signIn)}>
        <input
          type="email"
          placeholder="Your email"
          {...email}
        />
        <input
          type="password"
          placeholder="Your password"
          {...password}
        />
        <button
          type="submit"
          disabled={submitting}
        >
          Sign In
        </button>
      </form>
    </div>
  );
}

SignIn.propTypes = {
  ...reduxFormPropTypes,
  signIn: PropTypes.func.isRequired,
};

export default compose(
  reduxForm(
    {
      form: 'signIn',
      fields: schema.fields,
      validate: schema.validate,
      getFormState,
    },
    null,
    actionCreators
  ),
  CSSModules
)(SignIn, styles);
