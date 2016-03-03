
'use strict';

const PeriodDaysIterator = require('../PeriodDaysIterator');

const PeriodDaysIteratorMixin = Base => class extends Base {

  periodDays() {
    return new PeriodDaysIterator(this.opts);
  }

};

module.exports = PeriodDaysIteratorMixin;
