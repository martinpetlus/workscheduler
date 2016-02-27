
'use strict';

const PositiveFitnessScaler = require('../../ga/PositiveFitnessScaler');

describe('PositiveFitnessScaler', function() {
  let scaler, population;

  beforeEach(function() {
    scaler = new PositiveFitnessScaler();
    population = [
      {fitness: -1},
      {fitness: -2},
      {fitness: -4},
      {fitness: -8},
      {fitness: -8},
    ];
  });

  it('should scale fitness of chromosomes', function() {
    const scaled = scaler.scale(population);

    expect(scaled[0].fitness).toBe(0.5);
    expect(scaled[1].fitness).toBe(0.25);
    expect(scaled[2].fitness).toBe(0.125);
    expect(scaled[3].fitness).toBe(0.0625);
    expect(scaled[4].fitness).toBe(0.0625);
  });
});
