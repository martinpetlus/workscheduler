
'use strict';

const utils = require('../../utils');

const PROBABILITY = 0.65;

class SinglePointCrossover {

  crossover(pr1, pr2) {
    if (Math.random() <= PROBABILITY) {
      // Last point of crossover is last but one
      const pos = utils.math.randomInt(0, pr1.length - 2);

      for (let i = 0; i <= pos; i += 1) {
        let tmp = pr1[i];
        pr1[i] = pr2[i];
        pr2[i] = tmp;
      }
    }
  }

}

module.exports = SinglePointCrossover;
