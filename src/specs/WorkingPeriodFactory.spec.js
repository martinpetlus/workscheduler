
'use strict';

const WorkingPeriodFactory = require('./../WorkingPeriodFactory')
  , Chromosome = require('./../Chromosome');

describe('WorkingPeriodFactory', function() {
  let workingPeriodFactory, opts;

  beforeEach(function() {
    opts = { weeks: 1, employees: 1 };
    workingPeriodFactory = new WorkingPeriodFactory(opts);
  });

  describe('_conditionallyApplyMixin', function() {
    let mixin, that;

    beforeEach(function() {
      mixin = Base => class extends Base { xyz() {} };

      mixin.requiredOpts = {
        x: true,
        y: true
      };

      that = {
        clazz: class {},
        props: {}
      };
    });

    it('should conditionally apply mixin', function() {
      that.props.opts = {x: 0, y: 5};
      WorkingPeriodFactory.prototype._conditionallyApplyMixin.call(that, mixin);
      expect(typeof that.clazz.prototype.xyz).toBe('function');
    });

    it('should not conditionally apply mixin', function() {
      that.props.opts = {x: 0};
      WorkingPeriodFactory.prototype._conditionallyApplyMixin.call(that, mixin);
      expect(that.clazz.prototype.xyz).toBeUndefined();
    });
  });

  describe('create', function() {
    it('should create Chromosome instance', function() {
      const instance = workingPeriodFactory.create();
      expect(instance instanceof Chromosome).toBe(true);
    });
  });

  describe('createRandom', function() {
    it('should create random Chromosome instance', function() {
      spyOn(Math, 'random').andReturn(0.5);

      const instance = workingPeriodFactory.createRandom();

      expect(Math.random).toHaveBeenCalled();
      expect(instance instanceof Chromosome).toBe(true);
      expect(instance.getParam(0)).toBe(true);
      expect(instance.getParam(2)).toBe(true);
    });
  });
});
