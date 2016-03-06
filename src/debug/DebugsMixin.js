
'use strict';

class FitnessDebugs {

  constructor() {
    this.logs = new WeakMap();
  }

  log(chr, mixinName, fitness) {
    const mixins = this.logs.get(chr) || {};
    mixins[mixinName] = fitness;
    this.logs.set(chr, mixins);
  }

  toString(chr) {
    let str = ''
      , mixins = this.logs.get(chr);

    for (let mixinName in mixins) {
      str += `${mixinName}: ${mixins[mixinName]}\n`;
    }

    // Slice last newline character
    return str.slice(0, str.length - 1);
  }

}

module.exports.debugs = {
  fitness: new FitnessDebugs()
};
