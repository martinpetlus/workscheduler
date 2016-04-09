
'use strict';

const PROBABILITY = 0.01;

class StandardMutator {

  mutate(chromosomes) {
    for (let i = 0; i < chromosomes.length; i += 1) {
      const chromosome = chromosomes[i];

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
