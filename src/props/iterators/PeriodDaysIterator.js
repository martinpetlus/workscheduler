
'use strict';

const WeeksIterator = require('./WeeksIterator')
  , DaysIterator = require('./DaysIterator');

class PeriodDaysIterator {

  constructor(opts) {
    this.weeksIter = new WeeksIterator(opts);
    this.daysIter = new DaysIterator(opts);
  }

  next() {
    if (this.isDone()) {
      return null;
    }

    const curr = this.current();

    this.daysIter.next();

    if (this.daysIter.isDone()) {
      this.weeksIter.next();

      if (!this.weeksIter.isDone()) {
        this.daysIter.reset();
      }
    }

    return curr;
  }

  isDone() {
    return (
      this.weeksIter.isDone() &&
      this.daysIter.isDone()
    );
  }

  current() {
    if (this.isDone()) {
      return null;
    }

    return Object.assign(
      {},
      this.weeksIter.current(),
      this.daysIter.current()
    );
  }

}

module.exports = PeriodDaysIterator;
