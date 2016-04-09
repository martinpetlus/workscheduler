
'use strict'

const mixins = require('./iterators/mixins')
  , constants = require('../utils/constants');

const slice = Array.prototype.slice;

class WorkPeriodProperties {
  constructor(opts) {
    this.opts = opts;
  }

  shiftIndex() {
    const dst = slice.call(arguments).reduce((dst, val) => {
      return Object.assign(dst, typeof val.current === 'function' ?
        val.current() :
        val
      );
    }, {});

    if (!dst.employee || !dst.week || !dst.day) {
      throw Error('Index cannot be resolved.');
    }

    return (
      (dst.employee - 1) * (constants.DAYS_IN_WEEK * this.opts.weeks) +
      (dst.week - 1) * constants.DAYS_IN_WEEK +
      (dst.day - 1)
    );
  }

  length() {
    return this.opts.employees * constants.DAYS_IN_WEEK * this.opts.weeks;
  }

  stringOf(chromosome) {
    let curr1
      , header = ''
      , result = ''
      , employeesIter = this.employees();

    while (curr1 = employeesIter.next()) {
      let curr2
        , periodDaysIter = this.periodDays();

      if (!header) {
        let curr;

        while (curr = periodDaysIter.next()) {
          header += `${curr.day} | `;
        }

        header += '\n';
        periodDaysIter.reset();
      }

      while (curr2 = periodDaysIter.next()) {
        if (chromosome[this.shiftIndex(curr1, curr2)]) {
          result += 'W | ';
        } else {
          result += 'F | ';
        }
      }

      result += '\n';
    }

    return header + result;
  }
}

// Mix in iterators
for (let name in mixins) {
  WorkPeriodProperties = mixins[name](WorkPeriodProperties);
}

module.exports = WorkPeriodProperties;
