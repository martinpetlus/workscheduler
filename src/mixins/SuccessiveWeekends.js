
/*
 * Mixin to compute fitness regarding successive
 * free and working weekends in working period.
 */

'use strict';

const SuccessiveWeekends = (Base, props) => class extends Base {
  fitness() {
    let curr1
      , result = super.fitness()
      , employeesIter = props.employees();

    // Iterate through all employees
    while (curr1 = employeesIter.next()) {
      let curr2, stateFree, weeks
        , diffs = 0
        , weeksIter = props.weeks();

      // Iterate through weeks of period
      while (curr2 = weeksIter.next()) {
        let day6 = this[props.shiftIndex(curr1, curr2, { day: 6 })]
          , day7 = this[props.shiftIndex(curr1, curr2, { day: 7 })]
          , currFree = !day6 && !day7;

        if (curr2.week > 1) {
          // Switch state if successive weekends was reached
          if (weeks > (stateFree ?
              props.opts.successiveFreeWeekends :
              props.opts.successiveWorkingWeekends)) {
            weeks = 1;
            stateFree = !stateFree;
          }

          // Increment diff if state and current weekend state doesn't match
          if (stateFree !== currFree) {
            diffs += 1;
          }
        } else {
          // Initialize state from first weekend
          stateFree = currFree;
          weeks = 1;
        }

        weeks += 1;
      }

      result += -diffs;
    }

    return result;
  }
}

SuccessiveWeekends.requiredOpts = {
  successiveFreeWeekends: true,
  successiveWorkingWeekends: true
};

module.exports = SuccessiveWeekends;
