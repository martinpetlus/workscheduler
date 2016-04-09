
'use strict';

class Chromosome {

  constructor(length) {
    this.length = length;
    this.eachParam(i => this[i] = false);
  }

  eachParam(cb) {
    for (let i = 0; i < this.length; i += 1) {
      cb.call(this, i, this.getParam(i));
    }

    return this;
  }

  fitness() {
    return 0;
  }

  setParam(i, value) {
    this[i] = value;
    return this;
  }

  getParam(i) {
    return this[i];
  }

}

module.exports = Chromosome;
