
'use strict';

const constants = require('./../../utils/constants');

class DaysIterator {

  constructor() {
    this.day = 1;
  }

  next() {
    if (this.isDone()) {
      return null;
    }

    const curr = this.current();
    this.day += 1;

    return curr;
  }

  reset() {
    this.day = 1;
  }

  current() {
    if (this.isDone()) {
      return null;
    }

    return {
      day: this.day
    };
  }

  isDone() {
    return this.day > constants.DAYS_IN_WEEK;
  }

}

module.exports = DaysIterator;
