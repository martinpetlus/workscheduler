
/*
 * Mixin to compute fitness regarding maximum
 * successive work days of employees.
 */

'use strict';

const MaxSuccessiveWorkdays = (Base, props) => class extends Base {
  fitness() {
    let curr1
      , result = 0
      , employeesIter = props.employees();

    // Iterate through all employees
    while (curr1 = employeesIter.next()) {
      let curr2
        , successiveWorkdays = 0
        , periodDaysIter = props.periodDays();

      while (curr2 = periodDaysIter.next()) {
        if (this[props.shiftIndex(curr1, curr2)]) {
          successiveWorkdays += 1; // Day at work
        } else { // Free day
          // If maximum of successive work days is exceeded
          result += Math.min(
            props.opts.maxSuccessiveWorkdays - successiveWorkdays,
            0
          );

          // Reset the counter of successive work days
          successiveWorkdays = 0;
        }
      }

      // Check last days of period for successive work days
      result += Math.min(
        props.opts.maxSuccessiveWorkdays - successiveWorkdays,
        0
      );
    }

    if (__DEV__) {
      debugs.fitness.log(this, 'MaxSuccessiveWorkdays', result);
    }

    return super.fitness() + result;
  }
}

MaxSuccessiveWorkdays.requiredOpts = {
  maxSuccessiveWorkdays: true
};

module.exports = MaxSuccessiveWorkdays;
