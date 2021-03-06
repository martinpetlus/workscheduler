
'use strict';

const Chromosome = require('../ga/Chromosome');

module.exports = function(chr, props, id, week, day) {
  chr.setParam(props.shiftIndex({
    current() {
      return {
        employee: id,
        week: week,
        day: day
      };
    }
  }), true);
};
