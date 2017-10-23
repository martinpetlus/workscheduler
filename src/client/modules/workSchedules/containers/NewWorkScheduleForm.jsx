import React from 'react';
import { compose } from 'recompose';
import { reduxForm, Field, propTypes } from 'redux-form';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Button from 'components/Button';
import FormFooter from 'components/FormFooter';
import FormGroupSeparator from 'components/FormGroupSeparator';
import {
  renderFormGroup,
  required,
  maxLength,
  minLength,
  number,
  minValue,
  maxValue,
} from 'utils/reduxForm';

const NewWorkScheduleForm = ({
  handleSubmit,
  pristine,
  submitting,
  signIn,
  location: { state },
}) => (
  <form
    onSubmit={handleSubmit(signIn.bind(null, (state && state.nextPathname) || '/'))}
  >
    <h2>Sign in</h2>
    <hr />
    <Field
      id="newworkschedule-name"
      name="name"
      type="text"
      label="Name"
      component={renderFormGroup}
      validate={[required, minLength(1), maxLength(100)]}
    />
    <FormGroupSeparator />
    <Field
      id="newworkschedule-weeks"
      name="weeks"
      type="number"
      label="Weeks"
      component={renderFormGroup}
      validate={[required, number, minValue(1), maxValue(8)]}
    />
    <Field
      id="newworkschedule-employees"
      name="employees"
      type="number"
      label="Employees"
      component={renderFormGroup}
      validate={[required, number, minValue(1), maxValue(12)]}
    />
    <FormFooter>
      <Button type="submit" disabled={pristine || submitting}>Create</Button>
    </FormFooter>
  </form>
);

NewWorkScheduleForm.propTypes = {
  ...propTypes,
};

export default compose(
  withRouter,
  reduxForm({ form: 'newWorkSchedule' }),
  connect(null, null),
)(NewWorkScheduleForm);
