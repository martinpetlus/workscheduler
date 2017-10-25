
/*
 * Mixin to compute fitness regarding number
 * of work days in work period.
 */

'use strict';

const Workdays = (Base, props) => class extends Base {
  fitness() {
    let curr1
      , result = 0
      , employeesIter = props.employees();

    // Iterate through employees
    while (curr1 = employeesIter.next()) {
      let curr2
        , workdays = 0
        , periodDaysIter = props.periodDays();

      // Iterate through period days
      while (curr2 = periodDaysIter.next()) {
        // Check for work day
        if (this[props.shiftIndex(curr1, curr2)]) {
          workdays += 1;
        }
      }

      // Only exact work days produces 0 fitness decrease
      result += -Math.abs(props.opts.workdays - workdays);
    }

    if (__DEV__) {
      debugs.fitness.log(this, 'Workdays', result);
    }

    return super.fitness() + result;
  };
}

Workdays.requiredOpts = {
  workdays: true
};

module.exports = Workdays;
