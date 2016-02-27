
'use strict';

const StandardMutator = require('../../ga/mut/StandardMutator');

describe('StandardMutator', function() {
  let mutator, population;

  beforeEach(function() {
    mutator = new StandardMutator();
    population = [
      {'0': true, '1': false, length: 2},
      {'0': false, '1': true, length: 2}
    ];
  });

  it('should loop through params of chromosomes and mutate them', function() {
    let calls = 0;

    spyOn(Math, 'random').andCallFake(function() {
      calls += 1;

      if (calls === 1 || calls === 4) {
        return 0.001;
      } else {
        return 0.5;
      }
    });

    mutator.mutate(population);

    expect(calls).toBe(4);
    expect(population[0][0]).toBe(false);
    expect(population[0][1]).toBe(false);
    expect(population[1][0]).toBe(false);
    expect(population[1][1]).toBe(false);
  });
});
