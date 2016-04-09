
'use strict';

const Chromosome = require('../../ga/Chromosome')
  , WorkPeriodProperties = require('../../props/WorkPeriodProperties')
  , MaxSuccessiveWorkDays = require('../../mixins/MaxSuccessiveWorkDays')
  , setParamTrue = require('../set-param-true');

describe('MaxSuccessiveWorkDays mixin', function() {
  let chr, props;

  beforeEach(function() {
    props = new WorkPeriodProperties({
      weeks: 4,
      employees: 3,
      maxSuccessiveWorkDays: 3
    });

    const clazz = MaxSuccessiveWorkDays(Chromosome, props);

    chr = new clazz(props.length());
  });

  describe('super methods calls', function() {
    it('should call super fitness', function() {
      spyOn(Chromosome.prototype, 'fitness').andReturn(-2);
      expect(chr.fitness()).toBe(-2);
      expect(Chromosome.prototype.fitness).toHaveBeenCalled();
    });
  });

  describe('successive work days in the middle of period', function() {
    it('should compute correct fitness for one employee', function() {
      setParamTrue(chr, props, 1, 1, 1);
      setParamTrue(chr, props, 1, 1, 2);
      expect(chr.fitness()).toBe(0);

      setParamTrue(chr, props, 1, 1, 3);
      expect(chr.fitness()).toBe(0);

      setParamTrue(chr, props, 1, 1, 4);
      expect(chr.fitness()).toBe(-1);

      setParamTrue(chr, props, 1, 1, 5);
      expect(chr.fitness()).toBe(-2);

      setParamTrue(chr, props, 1, 3, 1);
      setParamTrue(chr, props, 1, 3, 2);
      setParamTrue(chr, props, 1, 3, 3);
      setParamTrue(chr, props, 1, 3, 4);
      setParamTrue(chr, props, 1, 3, 5);
      expect(chr.fitness()).toBe(-4);
    });

    it('should compute correct fitness for two employees', function() {
      setParamTrue(chr, props, 1, 1, 1);
      setParamTrue(chr, props, 1, 1, 2);
      setParamTrue(chr, props, 2, 1, 1);
      setParamTrue(chr, props, 2, 1, 2);
      expect(chr.fitness()).toBe(0);

      setParamTrue(chr, props, 1, 1, 3);
      setParamTrue(chr, props, 1, 1, 4);
      expect(chr.fitness()).toBe(-1);

      setParamTrue(chr, props, 2, 1, 3);
      setParamTrue(chr, props, 2, 1, 4);
      expect(chr.fitness()).toBe(-2);

      setParamTrue(chr, props, 2, 1, 5);
      expect(chr.fitness()).toBe(-3);
    });
  });

  describe('successive work days are at the end of period', function() {
    it('should compute correct fitness for one employee', function() {
      setParamTrue(chr, props, 1, 4, 4);
      setParamTrue(chr, props, 1, 4, 5);
      setParamTrue(chr, props, 1, 4, 6);
      setParamTrue(chr, props, 1, 4, 7);
      expect(chr.fitness()).toBe(-1);
    });

    it('should compute correct fitness for two employees', function() {
      setParamTrue(chr, props, 1, 4, 4);
      setParamTrue(chr, props, 1, 4, 5);
      setParamTrue(chr, props, 1, 4, 6);
      setParamTrue(chr, props, 1, 4, 7);
      setParamTrue(chr, props, 2, 4, 4);
      setParamTrue(chr, props, 2, 4, 5);
      setParamTrue(chr, props, 2, 4, 6);
      setParamTrue(chr, props, 2, 4, 7);
      expect(chr.fitness()).toBe(-2);
    });
  });
});
