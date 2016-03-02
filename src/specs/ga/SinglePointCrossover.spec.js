
'use strict';

const SinglePointCrossover = require('../../ga/cross/SinglePointCrossover')
  , mathUtils = require('../../utils/math');

describe('SinglePointCrossover', function() {
  let crossover, chr1, chr2;

  beforeEach(function() {
    crossover = new SinglePointCrossover();
    chr1 = {0: false, 1: false, 2: false, length: 3};
    chr2 = {0: true, 1: true, 2: true, length: 3};
    spyOn(Math, 'random').andReturn(0.2);
  });

  it('should crossover parent chromosomes', function() {
    spyOn(mathUtils, 'randomInt').andReturn(1);
    crossover.crossover(chr1, chr2);

    expect(chr1[0]).toBe(true);
    expect(chr2[0]).toBe(false);
    expect(chr1[1]).toBe(true);
    expect(chr2[1]).toBe(false);
    expect(chr1[2]).toBe(false);
    expect(chr2[2]).toBe(true);
  });
});
