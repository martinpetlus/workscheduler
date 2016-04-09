
'use strict';

const EmployeesIterator = require('../EmployeesIterator');

const EmployeesIteratorMixin = Base => class extends Base {

  employees() {
    return new EmployeesIterator(this.opts);
  }

};

module.exports = EmployeesIteratorMixin;
