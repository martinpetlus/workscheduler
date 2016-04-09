
'use strict';

const PROBABILITY = 0.65;

class Crossover {

  /**
   * Performs inplace crossover on two parent chromosomes.
   */
  crossover(pr1, pr2) {
    if (Array.isArray(pr1)) {
      pr2 = pr1[1];
      pr1 = pr1[0];
    }

    if (Math.random() <= PROBABILITY) {
      this._crossover(pr1, pr2);
    }
  }

}

module.exports = Crossover;
