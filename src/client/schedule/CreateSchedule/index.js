import React, { PropTypes } from 'react';
import AppBar from 'material-ui/AppBar';
import { compose } from 'recompose';
import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';
import {
  reduxForm,
  Field,
  propTypes as reduxFormPropTypes,
} from 'redux-form/immutable';
import { TextField } from 'redux-form-material-ui';
import { connect } from 'react-redux';

import schema from './schema';
import { actionCreators } from '../scheduleActions';
import { valuesToJS } from '../../app/utils/reduxForm';

export function CreateSchedule({
  submitting,
  pristine,
  handleSubmit,
  createSchedule,
}) {
  return (
    <form
      onSubmit={handleSubmit(createSchedule)}
      noValidate
    >
      <AppBar
        title="Create Schedule"
        iconElementRight={
          <FlatButton
            type="submit"
            label="Create"
            disabled={submitting || pristine}
          />
        }
      />
      <Paper zDeph={2}>
        <Field
          name="name"
          component={TextField}
          floatingLabelText="Schedule name"
          autoComplete="off"
        />
        <br />
        <Field
          type="number"
          name="weeks"
          component={TextField}
          floatingLabelText="Schedule work weeks"
        />
        <br />
        <Field
          type="number"
          name="employees"
          component={TextField}
          floatingLabelText="Number of employees"
        />
      </Paper>
    </form>
  );
}

CreateSchedule.propTypes = {
  ...reduxFormPropTypes,
  createSchedule: PropTypes.func.isRequired,
};

export default compose(
  reduxForm({
    form: 'createSchedule',
    fields: schema.fields,
    validate: valuesToJS(schema.validate),
  }),
  connect(null, actionCreators)
)(CreateSchedule);
