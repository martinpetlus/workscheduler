
'use strict';

class PositiveFitnessScaler {

  scale(entries) {
    const scaled = entries.map(entry => {
      return Object.assign({}, entry, {
        fitness: 1 / -entry.fitness
      });
    });

    const sum = scaled.reduce((acc, entry) => {
      return acc + entry.fitness;
    }, 0);

    scaled.forEach(entry => {
      entry.fitness /= sum;
    });

    return scaled;
  }

}

module.exports = PositiveFitnessScaler;
