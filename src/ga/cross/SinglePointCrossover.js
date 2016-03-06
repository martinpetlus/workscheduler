
'use strict';

const utils = require('../../utils')
  , Crossover = require('./Crossover');

class SinglePointCrossover extends Crossover {

  _crossover(pr1, pr2) {
    // Last point of crossover is last but one
    const pos = utils.math.randomInt(0, pr1.length - 2);

    // Exchange params of chromosomes from 0 to `pos`
    for (let i = 0; i <= pos; i += 1) {
      let tmp = pr1[i];
      pr1[i] = pr2[i];
      pr2[i] = tmp;
    }
  }

}

module.exports = SinglePointCrossover;
