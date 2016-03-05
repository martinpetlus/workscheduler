
'use strict';

const utils = require('./../utils');

class GeneticAlgorithm {

  _elite(entries) {
    entries = entries.slice(); // Copy array
    entries.sort(this.factory.constructor.descFitnessComparator);

    return entries.slice(0, this.opts.eliteCount).map(entry => {
      return this.factory.clone(entry.chromosome);
    });
  }

  constructor(opts, factory, selection, crossover, mutator) {
    this.opts = opts;
    this.factory = factory;
    this.selection = selection;
    this.crossover = crossover;
    this.mutator = mutator;
    this.population = [];

    for (let i = 0; i < this.opts.populationSize; i += 1) {
      this.population.push(this.factory.createRandom());
    }
  }

  run() {
    while (true) {
      const entries = this.population.map(chromosome => {
        return {
          fitness: chromosome.fitness(),
          chromosome
        };
      });

      const entry = entries.reduce((prev, curr) => {
        return prev.fitness > curr.fitness ? prev : curr;
      });

      utils.logger.log(entry.fitness);

      if (entry.fitness >= 0) {
        utils.logger.log(this.factory.stringOf(entry.chromosome));
        return;
      }

      this.population = this.runStep(entries);
    }
  }

  runStep(entries) {
    const newPopulation = [];

    if (this.opts.eliteCount != null) {
      newPopulation.push(...this._elite(entries));
    }

    this.selection.setEntries(entries);

    while (newPopulation.length < this.opts.populationSize) {
      const parents = this.selection.selectParents();

      parents[0] = this.factory.clone(parents[0]);
      parents[1] = this.factory.clone(parents[1]);

      this.crossover.crossover(parents);
      this.mutator.mutate(parents);

      newPopulation.push(...parents);
    }

    return newPopulation;
  }

}

module.exports = GeneticAlgorithm;
