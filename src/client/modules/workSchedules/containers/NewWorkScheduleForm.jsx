import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { reduxForm, Field, propTypes as reduxFormPropTypes } from 'redux-form';
import { connect } from 'react-redux';

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
import { actionCreators } from '../WorkSchedulesActions';

const NewWorkScheduleForm = ({
  handleSubmit,
  pristine,
  submitting,
  invalid,
  newWorkSchedule,
}) => (
  <form onSubmit={handleSubmit(newWorkSchedule)}>
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
    <FormGroupSeparator />
    <Field
      id="newworkschedule-employees"
      name="employees"
      type="number"
      label="Employees"
      component={renderFormGroup}
      validate={[required, number, minValue(1), maxValue(12)]}
    />
    <FormGroupSeparator />
    <Field
      id="newworkschedule-workdays"
      name="workdays"
      type="number"
      label="Desired workdays in week"
      placeholder="Desired workdays"
      component={renderFormGroup}
      validate={[required, number, minValue(1), maxValue(7)]}
    />
    <FormGroupSeparator />
    <Field
      id="newworkschedule-maxworkdaysinweek"
      name="maxWorkdaysPerWeek"
      type="number"
      label="Maximum workdays in week"
      placeholder="Maximum workdays"
      component={renderFormGroup}
      validate={[required, number, minValue(1), maxValue(7)]}
    />
    <FormGroupSeparator />
    <Field
      id="newworkschedule-maxsuccessiveworkdays"
      name="maxSuccessiveWorkdays"
      type="number"
      label="Maximum successive workdays in week"
      placeholder="Maximum successive workdays"
      component={renderFormGroup}
      validate={[required, number, minValue(1), maxValue(7)]}
    />
    <FormGroupSeparator />
    <Field
      id="newworkschedule-minemployeesatwork"
      name="minEmployeesAtWork"
      type="number"
      label="Minimum employees at work per day"
      placeholder="Minimum employees"
      component={renderFormGroup}
      validate={[required, number, minValue(1), maxValue(12)]}
    />
    <FormGroupSeparator />
    <Field
      id="newworkschedule-successivefreeweekends"
      name="successiveFree"
      type="number"
      label="Successive free weekends"
      placeholder="Free weekends"
      component={renderFormGroup}
      validate={[required, number, minValue(1), maxValue(8)]}
    />
    <FormGroupSeparator />
    <Field
      id="newworkschedule-successiveworkweekends"
      name="successiveWork"
      type="number"
      label="Successive work weekends"
      placeholder="Work weekends"
      component={renderFormGroup}
      validate={[required, number, minValue(1), maxValue(8)]}
    />
    <FormFooter>
      <Button type="submit" disabled={pristine || submitting || invalid}>Create</Button>
    </FormFooter>
  </form>
);

NewWorkScheduleForm.propTypes = {
  ...reduxFormPropTypes,
  newWorkSchedule: PropTypes.func.isRequired,
};

export default compose(
  reduxForm({ form: 'newWorkSchedule' }),
  connect(null, actionCreators),
)(NewWorkScheduleForm);
