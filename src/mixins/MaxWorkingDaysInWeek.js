
/*
 * Mixin to compute fitness regarding maximum
 * working days in week.
 */

'use strict';

const MaxWorkingDaysInWeek = (Base, props) => class extends Base {
  fitness() {
    let curr1
      , result = super.fitness()
      , employeesIter = props.employees();

    // Iterate through all employees
    while (curr1 = employeesIter.next()) {
      let curr2
        , weeksIter = props.weeks();

      // Iterate through weeks
      while (curr2 = weeksIter.next()) {
        let curr3
          , workingDays = 0
          , daysIter = props.days();

        // Compute number of working days in week
        while (curr3 = daysIter.next()) {
          if (this[props.shiftIndex(curr1, curr2, curr3)]) {
            workingDays += 1;
          }
        }

        // Decrease fitness only if maximum of working days in week is exceeded
        result += Math.min(0, props.opts.maxWorkingDaysInWeek - workingDays);
      }
    }

    return result;
  }
}

MaxWorkingDaysInWeek.requiredOpts = {
  maxWorkingDaysInWeek: true
};

module.exports = MaxWorkingDaysInWeek;
