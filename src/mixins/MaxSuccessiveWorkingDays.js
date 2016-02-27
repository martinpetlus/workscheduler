
/*
 * Mixin to compute fitness regarding maximum
 * successive working days of employees.
 */

'use strict';

const MaxSuccessiveWorkingDays = (Base, props) => class extends Base {
  fitness() {
    let curr1
      , result = super.fitness()
      , employeesIter = props.employees();

    // Iterate through all employees
    while (curr1 = employeesIter.next()) {
      let curr2
        , successiveWorkingDays = 0
        , periodDaysIter = props.periodDays();

        while (curr2 = periodDaysIter.next()) {
          if (this[props.shiftIndex(curr1, curr2)]) {
            successiveWorkingDays += 1; // Day at work
          } else { // Free day
            // If maximum of successive working days is exceeded
            result += Math.min(
              props.opts.maxSuccessiveWorkingDays - successiveWorkingDays,
              0
            );

            // Reset the counter of successive working days
            successiveWorkingDays = 0;
          }
        }

        // Check last days of period for successive working days
        result += Math.min(
          props.opts.maxSuccessiveWorkingDays - successiveWorkingDays,
          0
        );
    }

    return result;
  }
}

MaxSuccessiveWorkingDays.requiredOpts = {
  maxSuccessiveWorkingDays: true
};

module.exports = MaxSuccessiveWorkingDays;
