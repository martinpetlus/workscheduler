
/*
 * Mixin to compute fitness regarding number
 * of work days in work period.
 */

'use strict';

const WorkDays = (Base, props) => class extends Base {
  fitness() {
    let curr1
      , result = 0
      , employeesIter = props.employees();

    // Iterate through employees
    while (curr1 = employeesIter.next()) {
      let curr2
        , workDays = 0
        , periodDaysIter = props.periodDays();

      // Iterate through period days
      while (curr2 = periodDaysIter.next()) {
        // Check for work day
        if (this[props.shiftIndex(curr1, curr2)]) {
          workDays += 1;
        }
      }

      // Only exact work days produces 0 fitness decrease
      result += -Math.abs(props.opts.workDays - workDays);
    }

    if (__DEV__) {
      debugs.fitness.log(this, 'WorkDays', result);
    }

    return super.fitness() + result;
  };
}

WorkDays.requiredOpts = {
  workDays: true
};

module.exports = WorkDays;
