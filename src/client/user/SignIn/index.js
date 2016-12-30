import React, { PropTypes } from 'react';
import { compose } from 'recompose';
import CSSModules from 'react-css-modules';
import {
  reduxForm,
  propTypes as reduxFormPropTypes,
} from 'redux-form/immutable';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import AppBar from 'material-ui/AppBar';

import { actionCreators } from '../userActions';
import schema from './schema';
import styles from './styles.scss';

export function SignIn({
  signIn,
  fields: { email, password },
  submitting,
  handleSubmit,
  location,
}) {
  const nextPathname = location.state && location.state.nextPathname || '/';

  return (
    <div>
      <AppBar title="Sign in" showMenuIconButton={false} />
      <Paper zDeph={2} styleName="wrapper">
        <form onSubmit={handleSubmit(signIn.bind(null, nextPathname))}>
          <TextField
            type="email"
            floatingLabelText="Your email"
            underlineShow={false}
            fullWidth
            {...email}
          />
          <Divider />
          <TextField
            type="password"
            floatingLabelText="Your password"
            underlineShow={false}
            fullWidth
            {...password}
          />
          <Divider />
          <div styleName="controls">
            <RaisedButton
              type="submit"
              primary
              label="Sign in"
              disabled={submitting}
            />
          </div>
        </form>
      </Paper>
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
    },
    null,
    actionCreators
  ),
  CSSModules
)(SignIn, styles);
