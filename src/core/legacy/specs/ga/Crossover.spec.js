
'use strict';

const Crossover = require('../../ga/cross/Crossover');

describe('Crossover', function() {
  let crossover, pr1, pr2;

  beforeEach(function() {
    crossover = new Crossover();
    crossover._crossover = function() {};
    spyOn(crossover, '_crossover');

    pr1 = {};
    pr2 = {};

    spyOn(Math, 'random').andReturn(0.2);
  });

  it('should parse parents passed separately', function() {
    crossover.crossover(pr1, pr2);
    expect(crossover._crossover).toHaveBeenCalledWith(pr1, pr2)
  });

  it('should parse parents passed in array', function() {
    crossover.crossover([pr1, pr2]);
    expect(crossover._crossover).toHaveBeenCalledWith(pr1, pr2)
  });
});
