
'use strict';

const Chromosome = require('../../Chromosome')
  , WorkPeriodProperties = require('../../props/WorkPeriodProperties')
  , MaxWorkDaysInWeek = require('../../mixins/MaxWorkDaysInWeek')
  , setParamTrue = require('../set-param-true');

describe('MaxWorkDaysInWeek mixin', function() {
  let chr, props;

  beforeEach(function() {
    props = new WorkPeriodProperties({
      weeks: 4,
      employees: 3,
      maxWorkDaysInWeek: 5
    });

    const clazz = MaxWorkDaysInWeek(Chromosome, props);

    chr = new clazz(props.length());
  });

  describe('super methods calls', function() {
    it('should call super fitness', function() {
      spyOn(Chromosome.prototype, 'fitness').andReturn(-4);
      expect(chr.fitness()).toBe(-4);
      expect(Chromosome.prototype.fitness).toHaveBeenCalled();
    });
  });

  describe('one employee', function() {
    it('should compute correct fitness', function() {
      setParamTrue(chr, props, 1, 1, 1);
      setParamTrue(chr, props, 1, 1, 2);
      setParamTrue(chr, props, 1, 1, 3);
      setParamTrue(chr, props, 1, 1, 4);
      expect(chr.fitness()).toBe(0);

      setParamTrue(chr, props, 1, 1, 5);
      setParamTrue(chr, props, 1, 1, 6);
      expect(chr.fitness()).toBe(-1);

      setParamTrue(chr, props, 1, 4, 1);
      setParamTrue(chr, props, 1, 4, 2);
      setParamTrue(chr, props, 1, 4, 3);
      setParamTrue(chr, props, 1, 4, 4);
      setParamTrue(chr, props, 1, 4, 5);
      setParamTrue(chr, props, 1, 4, 6);
      setParamTrue(chr, props, 1, 4, 7);
      expect(chr.fitness()).toBe(-3);
    });
  });

  describe('two employees', function() {
    it('should compute correct fitness', function() {
      setParamTrue(chr, props, 1, 1, 1);
      setParamTrue(chr, props, 1, 1, 2);
      setParamTrue(chr, props, 1, 1, 3);
      setParamTrue(chr, props, 1, 1, 4);
      setParamTrue(chr, props, 2, 1, 1);
      setParamTrue(chr, props, 2, 1, 2);
      setParamTrue(chr, props, 2, 1, 3);
      setParamTrue(chr, props, 2, 1, 4);
      expect(chr.fitness()).toBe(0);

      setParamTrue(chr, props, 1, 1, 5);
      setParamTrue(chr, props, 1, 1, 6);
      setParamTrue(chr, props, 2, 1, 5);
      setParamTrue(chr, props, 2, 1, 6);
      expect(chr.fitness()).toBe(-2);
    });
  });
});
