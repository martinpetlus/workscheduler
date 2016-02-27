
'use strict';

const mathUtils = require('../../utils/math');

const PROBABILITY = 0.01;

class StandardMutator {

  mutate(population) {
    for (let i = 0; i < population.length; i += 1) {
      const chromosome = population[i];

      for (let j = 0; j < chromosome.length; j += 1) {
        const random = Math.random();

        if (random < PROBABILITY) {
          chromosome[j] = !chromosome[j];
        }
      }
    }
  }

}

module.exports = StandardMutator;
