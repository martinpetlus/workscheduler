
'use strict';

const utils = require('./utils');

class GeneticAlgorithm {
  constructor(opts, factory) {
    this.opts = opts;
    this.factory = factory;
    this.population = [];

    for (let i = 0; i < this.opts.initialPopulation; i += 1) {
      this.population.push(this.factory.createRandom());
    }
  }

  runStep() {
    const scores = this.population.map((chromosome, i) => {
      return {
        fitness: chromosome.fitness(),
        index: i
      };
    });

    // Sort chromosomes according their fitness value
    scores.sort(function(a, b) {
      return b.fitness - a.fitness;
    });

    console.log(scores);
  }

  mutate(chromosome) {
    let pos = utils.math.randomInt(0, chromosome.length - 1);
    chromosome[pos] = !chromosome[pos];
  }

  crossover(chromosome1, chromosome2) {
    const pos = utils.math.randomInt(0, chromosome1.length - 1);

    for (let i = 0; i <= pos; i += 1) {
      let tmp = chromosome1[i];
      chromosome1[i] = chromosome2[i];
      chromosome2[i] = tmp;
    }
  }
}

module.exports = GeneticAlgorithm;
