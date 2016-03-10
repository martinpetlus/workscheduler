
/*
 * Mixin to compute fitness regarding successive
 * free and work weekends in work period.
 */

'use strict';

const SuccessiveWeekends = (Base, props) => class extends Base {
  fitness() {
    let curr1
      , result = 0
      , employeesIter = props.employees();

    // Iterate through all employees
    while (curr1 = employeesIter.next()) {
      let curr2, stateFree, weeks
        , diffs = 0
        , weeksIter = props.weeks();

      // Iterate through weeks of period
      while (curr2 = weeksIter.next()) {
        let day6 = this[props.shiftIndex(curr1, curr2, {day: 6})]
          , day7 = this[props.shiftIndex(curr1, curr2, {day: 7})]
          , currFree = !day6 && !day7;

        if (curr2.week > 1) {
          // Switch state if successive weekends was reached
          if (weeks > (stateFree ?
              props.opts.successiveFreeWeekends :
              props.opts.successiveWorkWeekends)) {
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

    if (__DEV__) {
      debugs.fitness.log(this, 'SuccessiveWeekends', result);
    }

    return super.fitness() + result;
  }
}

SuccessiveWeekends.requiredOpts = {
  successiveFreeWeekends: true,
  successiveWorkWeekends: true
};

module.exports = SuccessiveWeekends;
