
'use strict';

const RouletteWheelSelection = require('../../ga/sel/roulette/RouletteWheelSelection');

describe('RouletteWheelSelection', function() {
  let selection, population;

  beforeEach(function() {
    selection = new RouletteWheelSelection();
    population = [
      {fitness() { return 3; }},
      {fitness() { return 3; }},
      {fitness() { return 3; }},
      {fitness() { return 3; }}
    ];
    selection.setPopulation(population);
  });

  it('should set population', function() {
    expect(selection.individuals[0].probability).toBe(0.25);
    expect(selection.individuals[1].probability).toBe(0.50);
    expect(selection.individuals[2].probability).toBe(0.75);
    expect(selection.individuals[3].probability).toBe(1);
  });

  it('should randomly select parent from population', function() {
    let probability;

    spyOn(Math, 'random').andCallFake(function() {
      return probability;
    });

    probability = 0;
    expect(selection.selectParent()).toBe(population[0]);

    probability = 0.1;
    expect(selection.selectParent()).toBe(population[0]);

    probability = 0.25;
    expect(selection.selectParent()).toBe(population[1]);

    probability = 0.3;
    expect(selection.selectParent()).toBe(population[1]);

    probability = 0.5;
    expect(selection.selectParent()).toBe(population[2]);

    probability = 0.6;
    expect(selection.selectParent()).toBe(population[2]);

    probability = 0.75;
    expect(selection.selectParent()).toBe(population[3]);

    probability = 0.8;
    expect(selection.selectParent()).toBe(population[3]);
  });

  it('should randomly select unique parents from population', function() {
    let calls = 0;

    spyOn(Math, 'random').andCallFake(function() {
      calls += 1;

      if (calls <= 2) {
        return 0.1;
      } else {
        return 0.5;
      }
    });

    const parents = selection.selectParents();
    expect(parents[0]).not.toBe(parents[1]);
  });
});
