
'use strict';

const utils = require('./utils');

class GeneticAlgorithm {
  constructor(opts, factory, selection, crossover, mutator) {
    this.opts = opts;
    this.factory = factory;
    this.selection = selection;
    this.crossover = crossover;
    this.mutator = mutator;
    this.population = [];

    for (let i = 0; i < this.opts.initialPopulation; i += 1) {
      this.population.push(this.factory.createRandom());
    }
  }

  run() {
    const newPopulation = [];

    this.selection.setPopulation(this.population.map(chromosome => {
      return {
        fitness: chromosome.fitness(),
        chromosome
      };
    }));

    while (newPopulation.length < this.opts.initialPopulation) {
      const parents = this.selection.selectParents();

      parents[0] = parents[0].clone();
      parents[1] = parents[1].clone();

      this.crossover.crossover(parents);

      newPopulation.push(...parents);
    }

    this.mutator.mutate(newPopulation);

    this.population = newPopulation;
  }

}

module.exports = GeneticAlgorithm;
