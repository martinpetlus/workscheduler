import React from 'react';
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

export function CreateSchedule({
  fields: { name, weeks, employees },
  submitting,
  handleSubmit,
}) {
  return (
    <div>
      <AppBar
        title="Create Schedule"
        iconElementRight={
          <FlatButton label="Create" disabled={submitting} />
        }
        onRightIconButtonTouchTap={event => event}
      />
      <Paper zDeph={2}>
        <form
          onSubmit={handleSubmit(x => x)}
        >
          <TextField
            type="text"
            floatingLabelText="Schedule name"
            {...name}
            errorText={name.error}
          />
          <br />
          <TextField
            type="number"
            floatingLabelText="Schedule work weeks"
            {...weeks}
            errorText={weeks.error}
          />
          <br />
          <TextField
            type="number"
            floatingLabelText="Number of empoyees"
            {...employees}
            errorText={employees.error}
          />
        </form>
      </Paper>
    </div>
  );
}

CreateSchedule.propTypes = {
  ...reduxFormPropTypes,
};

export default compose(
  reduxForm(
    {
      form: 'createSchedule',
      fields: schema.fields,
      validate: schema.validate,
      getFormState,
    }
  )
)(CreateSchedule);
