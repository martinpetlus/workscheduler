
'use strict';

const WorkPeriodFactory = require('../WorkPeriodFactory')
  , Chromosome = require('../ga/Chromosome');

describe('WorkPeriodFactory', function() {
  let workPeriodFactory, opts;

  beforeEach(function() {
    opts = { weeks: 1, employees: 1 };
    workPeriodFactory = new WorkPeriodFactory(opts);
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
      WorkPeriodFactory.prototype._conditionallyApplyMixin.call(that, mixin);
      expect(typeof that.clazz.prototype.xyz).toBe('function');
    });

    it('should not conditionally apply mixin', function() {
      that.props.opts = {x: 0};
      WorkPeriodFactory.prototype._conditionallyApplyMixin.call(that, mixin);
      expect(that.clazz.prototype.xyz).toBeUndefined();
    });
  });

  describe('create', function() {
    it('should create Chromosome instance', function() {
      const instance = workPeriodFactory.create();
      expect(instance instanceof Chromosome).toBe(true);
    });
  });

  describe('createRandom', function() {
    it('should create random Chromosome instance', function() {
      spyOn(Math, 'random').andReturn(0.5);

      const instance = workPeriodFactory.createRandom();

      expect(Math.random).toHaveBeenCalled();
      expect(instance instanceof Chromosome).toBe(true);
      expect(instance.getParam(0)).toBe(true);
      expect(instance.getParam(2)).toBe(true);
    });
  });

  describe('clone', function() {
    it('should clone chromosome', function() {
      workPeriodFactory.clazz = class extends Chromosome {};

      const chr = {0: false, 1: true, 2: false, length: 3};

      const clone = workPeriodFactory.clone(chr);

      expect(clone instanceof workPeriodFactory.clazz).toBe(true);
      expect(chr.length).toBe(clone.length);
      expect(chr[0]).toBe(clone[0]);
      expect(chr[1]).toBe(clone[1]);
      expect(chr[2]).toBe(clone[2]);
    });
  })
});
