
'use strict';

const Chromosome = require('../../Chromosome')
  , WorkPeriodProperties = require('../../props/WorkPeriodProperties')
  , MinEmployeesAtWork = require('../../mixins/MinEmployeesAtWork')
  , setParamTrue = require('../set-param-true');

describe('MinEmployeesAtWork mixin', function() {
  let chr, props;

  beforeEach(function() {
    props = new WorkPeriodProperties({
      weeks: 4,
      employees: 3,
      minEmployeesAtWork: 1
    });

    const clazz = MinEmployeesAtWork(Chromosome, props);

    chr = new clazz(props.length());
  });

  describe('super methods calls', function() {
    it('should call super fitness', function() {
      spyOn(Chromosome.prototype, 'fitness').andReturn(-2);
      expect(chr.fitness()).toBe(-30);
      expect(Chromosome.prototype.fitness).toHaveBeenCalled();
    });
  });

  it('should compute correct fitness', function() {
    expect(chr.fitness()).toBe(-28);

    setParamTrue(chr, props, 1, 1, 5);
    expect(chr.fitness()).toBe(-27);

    setParamTrue(chr, props, 2, 1, 5);
    expect(chr.fitness()).toBe(-27);

    setParamTrue(chr, props, 2, 1, 6);
    expect(chr.fitness()).toBe(-26);
  });
});
