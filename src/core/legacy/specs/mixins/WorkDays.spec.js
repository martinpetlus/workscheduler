
'use strict';

const Chromosome = require('../../ga/Chromosome')
  , WorkPeriodProperties = require('../../props/WorkPeriodProperties')
  , Workdays = require('../../mixins/Workdays')
  , setParamTrue = require('../set-param-true');

describe('Workdays mixin', function() {
  let clazz, props;

  beforeEach(function() {
    clazz = Workdays(Chromosome);
  });

  describe('super methods calls', function() {
    let chr, props;

    beforeEach(function() {
      props = new WorkPeriodProperties({
        weeks: 4,
        employees: 1,
        workdays: 6
      });

      const clazz = Workdays(Chromosome, props);

      chr = new clazz(props.length());
    });

    it('should call super fitness', function() {
      spyOn(Chromosome.prototype, 'fitness').andReturn(-2);
      expect(chr.fitness()).toBe(-8);
      expect(Chromosome.prototype.fitness).toHaveBeenCalled();
    });
  });

  describe('one employee', function() {
    let chr, props;

    beforeEach(function() {
      props = new WorkPeriodProperties({
        weeks: 4,
        employees: 1,
        workdays: 6
      });

      const clazz = Workdays(Chromosome, props);

      chr = new clazz(props.length());
    });

    it('should compute correct fitness', function() {
      expect(chr.fitness()).toBe(-6);

      setParamTrue(chr, props, 1, 1, 1);
      setParamTrue(chr, props, 1, 1, 2);
      setParamTrue(chr, props, 1, 1, 3);
      setParamTrue(chr, props, 1, 1, 4);
      expect(chr.fitness()).toBe(-2);

      setParamTrue(chr, props, 1, 1, 5);
      setParamTrue(chr, props, 1, 1, 6);
      expect(chr.fitness()).toBe(0);

      setParamTrue(chr, props, 1, 1, 7);
      expect(chr.fitness()).toBe(-1);
    });
  });

  describe('two employees', function() {
    let chr, props;

    beforeEach(function() {
      props = new WorkPeriodProperties({
        weeks: 4,
        employees: 2,
        workdays: 6
      });

      const clazz = Workdays(Chromosome, props);

      chr = new clazz(props.length());
    });

    it('should compute correct fitness', function() {
      expect(chr.fitness()).toBe(-12);

      setParamTrue(chr, props, 1, 1, 1);
      setParamTrue(chr, props, 1, 1, 3);
      setParamTrue(chr, props, 2, 1, 2);
      setParamTrue(chr, props, 2, 1, 4);
      expect(chr.fitness()).toBe(-8);

      setParamTrue(chr, props, 1, 2, 5);
      setParamTrue(chr, props, 1, 2, 6);
      setParamTrue(chr, props, 2, 2, 5);
      setParamTrue(chr, props, 2, 2, 6);
      expect(chr.fitness()).toBe(-4);

      setParamTrue(chr, props, 1, 3, 5);
      setParamTrue(chr, props, 1, 3, 6);
      setParamTrue(chr, props, 2, 3, 5);
      setParamTrue(chr, props, 2, 3, 6);
      expect(chr.fitness()).toBe(0);

      setParamTrue(chr, props, 1, 4, 5);
      setParamTrue(chr, props, 1, 4, 6);
      setParamTrue(chr, props, 2, 4, 5);
      setParamTrue(chr, props, 2, 4, 6);
      expect(chr.fitness()).toBe(-4);
    });
  });
});
