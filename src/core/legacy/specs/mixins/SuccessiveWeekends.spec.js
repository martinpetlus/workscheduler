
'use strict';

const Chromosome = require('../../ga/Chromosome')
  , WorkPeriodProperties = require('../../props/WorkPeriodProperties')
  , SuccessiveWeekends = require('../../mixins/SuccessiveWeekends')
  , setParamTrue = require('../set-param-true');

describe('SuccessiveWeekends mixin', function() {
  describe('super methods calls', function() {
    let chr, props;

    beforeEach(function() {
      props = new WorkPeriodProperties({
        weeks: 4,
        employees: 1,
        successiveFreeWeekends: 2,
        successiveWorkWeekends: 2
      });

      const clazz = SuccessiveWeekends(Chromosome, props);

      chr = new clazz(props.length());
    });

    it('should call super fitness', function() {
      spyOn(Chromosome.prototype, 'fitness').andReturn(-2);
      expect(chr.fitness()).toBe(-6);
      expect(Chromosome.prototype.fitness).toHaveBeenCalled();
    });
  });

  describe('4 week period', function() {
    let chr, props;

    beforeEach(function() {
      props = new WorkPeriodProperties({
        weeks: 4,
        employees: 1,
        successiveFreeWeekends: 2,
        successiveWorkWeekends: 2
      });

      const clazz = SuccessiveWeekends(Chromosome, props);

      chr = new clazz(props.length());
    });

    it('first two free weekends in period', function() {
      setParamTrue(chr, props, 1, 3, 6);
      setParamTrue(chr, props, 1, 3, 7);
      setParamTrue(chr, props, 1, 4, 6);
      setParamTrue(chr, props, 1, 4, 7);
      expect(chr.fitness()).toBe(0);
    });

    it('last two free weekends in period', function() {
      setParamTrue(chr, props, 1, 1, 6);
      setParamTrue(chr, props, 1, 1, 7);
      setParamTrue(chr, props, 1, 2, 6);
      setParamTrue(chr, props, 1, 2, 7);
      expect(chr.fitness()).toBe(0);
    });

    it('last work weekend in 4 week period', function() {
      setParamTrue(chr, props, 1, 4, 6);
      setParamTrue(chr, props, 1, 4, 7);
      expect(chr.fitness()).toBe(-2);
    });

    it('two work weekends in middle of period', function() {
      setParamTrue(chr, props, 1, 2, 6);
      setParamTrue(chr, props, 1, 2, 7);
      setParamTrue(chr, props, 1, 3, 6);
      expect(chr.fitness()).toBe(-5);
    });

    describe('two employees', function() {
      let chr, props;

      beforeEach(function() {
        props = new WorkPeriodProperties({
          weeks: 4,
          employees: 2,
          successiveFreeWeekends: 2,
          successiveWorkWeekends: 2
        });

        const clazz = SuccessiveWeekends(Chromosome, props);

        chr = new clazz(props.length());
      });

      it('should compute correct fitness', function() {
        expect(chr.fitness()).toBe(-8);
        setParamTrue(chr, props, 1, 3, 6);
        setParamTrue(chr, props, 1, 3, 7);
        setParamTrue(chr, props, 2, 4, 6);
        setParamTrue(chr, props, 2, 4, 7);
        expect(chr.fitness()).toBe(-4);
        setParamTrue(chr, props, 1, 4, 6);
        setParamTrue(chr, props, 1, 4, 7);
        setParamTrue(chr, props, 2, 3, 6);
        setParamTrue(chr, props, 2, 3, 7);
        expect(chr.fitness()).toBe(0);
        setParamTrue(chr, props, 2, 3, 6);
        setParamTrue(chr, props, 2, 3, 7);
        expect(chr.fitness()).toBe(0);
      });
    });
  });

  describe('8 week period', function() {
    let chr, props;

    beforeEach(function() {
      props = new WorkPeriodProperties({
        weeks: 8,
        employees: 1,
        successiveFreeWeekends: 3,
        successiveWorkWeekends: 2
      });

      const clazz = SuccessiveWeekends(Chromosome, props);

      chr = new clazz(props.length());
    });

    describe('two work weekends in middle of period', function() {
      it('should compute correct fitness', function() {
        setParamTrue(chr, props, 1, 2, 6);
        setParamTrue(chr, props, 1, 2, 7);
        setParamTrue(chr, props, 1, 4, 6);
        setParamTrue(chr, props, 1, 4, 7);
        setParamTrue(chr, props, 1, 7, 6);
        setParamTrue(chr, props, 1, 7, 7);
        setParamTrue(chr, props, 1, 8, 6);
        setParamTrue(chr, props, 1, 8, 7);
        expect(chr.fitness()).toBe(-8);
      });
    });
  });
});
