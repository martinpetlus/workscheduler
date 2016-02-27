
'use strict';

const DaysIterator = require('./../DaysIterator');

const DaysIteratorMixin = Base => class extends Base {

  days() {
    return new DaysIterator(this.opts);
  }

};

module.exports = DaysIteratorMixin;
