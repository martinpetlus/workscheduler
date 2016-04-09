
'use strict';

const utils = require('../../utils')
  , Crossover = require('./Crossover');

class TwoPointCrossover extends Crossover {

  _crossover(pr1, pr2) {
    const pos1 = utils.math.randomInt(0, pr1.length - 1)
      , pos2 = utils.math.randomInt(0, pr1.length - 1)
      , to = Math.max(pos1, pos2);

    for (let i = Math.min(pos1, pos2); i <= to; i += 1) {
      let tmp = pr1[i];
      pr1[i] = pr2[i];
      pr2[i] = tmp;
    }
  }

}

module.exports = TwoPointCrossover;
