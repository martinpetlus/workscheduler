
'use strict';

const WeeksIterator = require('../WeeksIterator');

const WeeksIteratorMixin = Base => class extends Base {

  weeks() {
    return new WeeksIterator(this.opts);
  }

};


module.exports = WeeksIteratorMixin;
