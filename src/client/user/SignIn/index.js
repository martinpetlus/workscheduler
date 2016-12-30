import React, { PropTypes } from 'react';
import { compose } from 'recompose';
import CSSModules from 'react-css-modules';
import {
  reduxForm,
  Field,
  propTypes as reduxFormPropTypes,
} from 'redux-form/immutable';
import RaisedButton from 'material-ui/RaisedButton';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import AppBar from 'material-ui/AppBar';
import { connect } from 'react-redux';
import { TextField } from 'redux-form-material-ui';

import { actionCreators } from '../userActions';
import schema from './schema';
import styles from './styles.scss';
import { valuesToJS } from '../../app/utils/reduxForm';

export function SignIn({
  signIn,
  submitting,
  pristine,
  handleSubmit,
  location,
}) {
  const nextPathname = location.state && location.state.nextPathname || '/';

  return (
    <div>
      <AppBar title="Sign in" showMenuIconButton={false} />
      <Paper zDeph={2} styleName="wrapper">
        <form onSubmit={handleSubmit(signIn.bind(null, nextPathname))}>
          <Field
            name="email"
            type="email"
            component={TextField}
            floatingLabelText="Your email"
            underlineShow={false}
            fullWidth
          />
          <Divider />
          <Field
            name="password"
            type="password"
            component={TextField}
            floatingLabelText="Your password"
            underlineShow={false}
            fullWidth
          />
          <Divider />
          <div styleName="controls">
            <RaisedButton
              type="submit"
              primary
              label="Sign in"
              disabled={submitting || pristine}
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
  reduxForm({
    form: 'signIn',
    fields: schema.fields,
    validate: valuesToJS(schema.validate),
  }),
  connect(null, actionCreators),
  CSSModules
)(SignIn, styles);
