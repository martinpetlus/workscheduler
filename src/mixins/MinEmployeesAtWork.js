
/*
 * Mixin to compute fitness regarding minimum
 * employees at work per each day of period.
 */

'use strict';

const MinEmployeesAtWork = (Base, props) => class extends Base {
  fitness() {
    let curr1
      , periodDaysIter = props.periodDays()
      , result = super.fitness();

    // Iterate through period days
    while (curr1 = periodDaysIter.next()) {
      let curr2
        , employeesAtWork = 0
        , employeesIter = props.employees();

        // Iterate through employees
        while (curr2 = employeesIter.next()) {
          // Check for working day
          if (this[props.shiftIndex(curr1, curr2)]) {
            employeesAtWork += 1;
          }
        }

        result += Math.min(0, employeesAtWork - props.opts.minEmployeesAtWork);
    }

    return result;
  }
}

MinEmployeesAtWork.requiredOpts = {
  minEmployeesAtWork: true
};

module.exports = MinEmployeesAtWork;
