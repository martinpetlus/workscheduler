
'use strict';

class EmployeesIterator {

  constructor(opts) {
    this.opts = opts;
    this.employee = 1;
  }

  next() {
    if (this.isDone()) {
      return null;
    }

    const curr = this.current();
    this.employee += 1;

    return curr;
  }

  isDone() {
    return this.employee > this.opts.employees;
  }

  current() {
    if (this.isDone()) {
      return null;
    }

    return {
      employee: this.employee
    };
  }

}

module.exports = EmployeesIterator;
