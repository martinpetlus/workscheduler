
'use strict';

class WeeksIterator {

  constructor(opts) {
    this.opts = opts;
    this.week = 1;
  }

  next() {
    if (this.isDone()) {
      return null;
    }

    const curr = this.current();
    this.week += 1;

    return curr;
  }

  isDone() {
    return this.week > this.opts.weeks;
  }

  current() {
    if (this.isDone()) {
      return null;
    }

    return {
      week: this.week
    };
  }

}

module.exports = WeeksIterator;
