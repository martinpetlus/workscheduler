
/*
 * Mixin to compute fitness regarding maximum
 * work days in week.
 */

'use strict';

const MaxWorkDaysInWeek = (Base, props) => class extends Base {
  fitness() {
    let curr1
      , result = 0
      , employeesIter = props.employees();

    // Iterate through all employees
    while (curr1 = employeesIter.next()) {
      let curr2
        , weeksIter = props.weeks();

      // Iterate through weeks
      while (curr2 = weeksIter.next()) {
        let curr3
          , workDays = 0
          , daysIter = props.days();

        // Compute number of work days in week
        while (curr3 = daysIter.next()) {
          if (this[props.shiftIndex(curr1, curr2, curr3)]) {
            workDays += 1;
          }
        }

        // Decrease fitness only if maximum of work days in week is exceeded
        result += Math.min(0, props.opts.maxWorkDaysInWeek - workDays);
      }
    }

    if (__DEV__) {
      debugs.fitness.log(this, 'MaxWorkDaysInWeek', result);
    }

    return super.fitness() + result;
  }
}

MaxWorkDaysInWeek.requiredOpts = {
  maxWorkDaysInWeek: true
};

module.exports = MaxWorkDaysInWeek;
