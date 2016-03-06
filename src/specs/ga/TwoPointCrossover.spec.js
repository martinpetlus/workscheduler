
'use strict';

const TwoPointCrossover = require('../../ga/cross/TwoPointCrossover')
  , utils = require('../../utils');

describe('TwoPointCrossover', function() {
  let crossover, chr1, chr2, fake, calls;

  beforeEach(function() {
    crossover = new TwoPointCrossover();

    chr1 = {0: false, 1: false, 2: false, 3: false, length: 4};
    chr2 = {0: true, 1: true, 2: true, 3: true, length: 4};

    spyOn(Math, 'random').andReturn(0.2);
    spyOn(utils.math, 'randomInt').andCallFake(function() {
      calls += 1;
      return fake();
    });

    calls = 0;
  });

  it('should crossover chromosomes with ordered positions', function() {
    fake = function() {
      switch (calls) {
        case 1: return 1;
        case 2: return 2;
      }
    };

    crossover._crossover(chr1, chr2);

    expect(chr1[0]).toBe(false);
    expect(chr1[1]).toBe(true);
    expect(chr1[2]).toBe(true);
    expect(chr1[3]).toBe(false);

    expect(chr2[0]).toBe(true);
    expect(chr2[1]).toBe(false);
    expect(chr2[2]).toBe(false);
    expect(chr2[3]).toBe(true);
  });

  it('should crossover chromosomes with unordered positions', function() {
    fake = function() {
      switch (calls) {
        case 1: return 3;
        case 2: return 1;
      }
    };

    crossover._crossover(chr1, chr2);

    expect(chr1[0]).toBe(false);
    expect(chr1[1]).toBe(true);
    expect(chr1[2]).toBe(true);
    expect(chr1[3]).toBe(true);

    expect(chr2[0]).toBe(true);
    expect(chr2[1]).toBe(false);
    expect(chr2[2]).toBe(false);
    expect(chr2[3]).toBe(false);
  });
});
