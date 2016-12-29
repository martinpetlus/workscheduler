import React, { PropTypes } from 'react';
import AppBar from 'material-ui/AppBar';
import { compose } from 'recompose';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';
import {
  reduxForm,
  propTypes as reduxFormPropTypes,
} from 'redux-form';

import schema from './schema';
import getFormState from '../../app/utils/getFormState';
import { actionCreators } from '../scheduleActions';

export function CreateSchedule({
  fields: { name, weeks, employees },
  submitting,
  handleSubmit,
  createSchedule,
}) {
  return (
    <form
      onSubmit={handleSubmit(createSchedule)}
    >
      <AppBar
        title="Create Schedule"
        iconElementRight={
          <FlatButton
            type="submit"
            label="Create"
            disabled={submitting}
          />
        }
      />
      <Paper zDeph={2}>
        <TextField
          name="name"
          floatingLabelText="Schedule name"
          autoComplete="off"
          {...name}
          errorText={name.error}
        />
        <br />
        <TextField
          type="number"
          name="weeks"
          floatingLabelText="Schedule work weeks"
          {...weeks}
          errorText={weeks.error}
        />
        <br />
        <TextField
          type="number"
          name="employees"
          floatingLabelText="Number of employees"
          {...employees}
          errorText={employees.error}
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
  reduxForm(
    {
      form: 'createSchedule',
      fields: schema.fields,
      validate: schema.validate,
      getFormState,
    },
    null,
    actionCreators
  )
)(CreateSchedule);
