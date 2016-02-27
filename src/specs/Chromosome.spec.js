
'use strict';

const Chromosome = require('../Chromosome')
  , constants = require('../utils/constants');

describe('Chromosome', function() {

  describe('eachParam', function() {
    it('should call callback for each param', function() {
      const length = 3
        , chr = new Chromosome(length)
        , spy = jasmine.createSpy('spyCallback');

      chr.setParam(1, true);
      chr.eachParam(spy);

      expect(spy).toHaveBeenCalledWith(0, false);
      expect(spy).toHaveBeenCalledWith(1, true);
      expect(spy).toHaveBeenCalledWith(2, false);
      expect(spy.callCount).toEqual(length);
    });
  });

  describe('setParam, getParam', function() {
    it('should set and get parameter of Chromosome instance', function() {
      const chr = new Chromosome(3)
        , value = true;

      chr.setParam(0, value);
      expect(chr.getParam(0)).toBe(value);
    });
  });

  describe('clone', function() {
    it('should clone Chromosome instance', function() {
      const chr = new Chromosome({ length() { return 3; } });

      chr.setParam(0, true);
      chr.setParam(2, true);

      const clone = chr.clone();

      expect(chr.length).toBe(clone.length);
      expect(Object.getPrototypeOf(chr)).toBe(Object.getPrototypeOf(clone));
      expect(chr.getParam(0)).toBe(clone.getParam(0));
      expect(chr.getParam(1)).toBe(clone.getParam(1));
      expect(chr.getParam(2)).toBe(clone.getParam(2));
    });
  })
});
