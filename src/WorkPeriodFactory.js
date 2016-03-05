
'use strict';

const mixins = require('./mixins')
  , Chromosome = require('./ga/Chromosome')
  , WorkPeriodProperties = require('./props/WorkPeriodProperties')
  , utils = require('./utils');

class WorkPeriodFactory {

  _conditionallyApplyMixin(mixin) {
    const apply = Object.keys(mixin.requiredOpts).every(opt => {
      return this.props.opts[opt] != null;
    });

    if (apply) {
      this.clazz = mixin(this.clazz, this.props);
    }

    return apply;
  }

  _extendClazz() {
    for (let name in mixins) {
      if (this._conditionallyApplyMixin(mixins[name])) {
        utils.logger.log(`Applied fitness mixin: ${name}`);
      }
    }
  }

  constructor(opts) {
    this.props = new WorkPeriodProperties(opts);
    this.clazz = Chromosome;
    this._extendClazz();
  }

  create() {
    return new this.clazz(this.props.length());
  }

  createRandom() {
    return this.create().eachParam(function(i) {
      this.setParam(i, Math.random() >= 0.5);
    });
  }

}

module.exports = WorkPeriodFactory;
