
'use strict';

const GeneticAlgorithm = require('../ga/GeneticAlgorithm');

describe('GeneticAlgorithm', function() {
  let algorithm, opts, factory, selection, mutator, crossover;

  beforeEach(function() {
    opts = {populationSize: 10, eliteCount: 2};

    selection = {};
    crossover = {};
    mutator = {};

    factory = {
      constructor: {
        descFitnessComparator: function(a, b) {
          return b.fitness - a. fitness;
        }
      },
      createRandom() {
        return {};
      },
      clone: function(arg) {
        return arg;
      }
    };

    algorithm = new GeneticAlgorithm(
      opts,
      factory,
      selection,
      crossover,
      mutator
    );
  });

  describe('_elite', function() {
    it('should return elite chromosomes from entries', function() {
      const entries = [
        {fitness: 4, chromosome: {}},
        {fitness: 6, chromosome: {}},
        {fitness: 1, chromosome: {}},
        {fitness: 9, chromosome: {}}
      ];

      const chromosomes = algorithm._elite(entries);

      expect(chromosomes.length).toBe(opts.eliteCount);
      expect(chromosomes[0]).toBe(entries[3].chromosome);
      expect(chromosomes[1]).toBe(entries[1].chromosome);
    });
  });
});
