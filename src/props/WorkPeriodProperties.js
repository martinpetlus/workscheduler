
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
}

// Mix in iterators
for (let name in mixins) {
  WorkPeriodProperties = mixins[name](WorkPeriodProperties);
}

module.exports = WorkPeriodProperties;
