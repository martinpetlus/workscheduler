
/*
 * Mixin to compute fitness regarding number
 * of working days in working period.
 */

'use strict';

const WorkingDays = (Base, props) => class extends Base {
  fitness() {
    let curr1
      , result = super.fitness()
      , employeesIter = props.employees();

    // Iterate through employees
    while (curr1 = employeesIter.next()) {
      let curr2
        , workingDays = 0
        , periodDaysIter = props.periodDays();

      // Iterate through period days
      while (curr2 = periodDaysIter.next()) {
        // Check for working day
        if (this[props.shiftIndex(curr1, curr2)]) {
          workingDays += 1;
        }
      }

      // Only exact working days produces 0 fitness decrease
      result += -Math.abs(props.opts.workingDays - workingDays);
    }

    return result;
  };
}

WorkingDays.requiredOpts = {
  workingDays: true
};

module.exports = WorkingDays;
