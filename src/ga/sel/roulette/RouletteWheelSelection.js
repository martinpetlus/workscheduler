
'use strict';

class RouletteWheelSelection {

  constructor(scaler) {
    this.scaler = scaler;
  }

  selectParent() {
    const random = Math.random();

    for (let i = 0; i < this.entries.length - 1; i += 1) {
      const entry = this.entries[i];

      if (random < this.entries[i].probability &&
          random >= (i > 0 ? this.entries[i - 1].probability : 0)) {
        return entry.chromosome;
      }
    }

    return this.entries[this.entries.length - 1].chromosome;
  }

  /**
   * Set population to select parents from.
   *
   * @param {array<object>} entries Each entry is and object
   *   with `chromosome` and computed `fitness` properties.
   */
  setEntries(entries) {
    this.entries = this.scaler.scale(entries);

    const sum = this.entries.reduce((acc, entry) => {
      return acc + entry.fitness;
    }, 0);

    this.entries.reduce((acc, entry) => {
      return (entry.probability = acc + entry.fitness / sum);
    }, 0);
  }

  selectParents() {
    let ch2
      , ch1 = this.selectParent();

    while ((ch2 = this.selectParent()) === ch1);

    return [ch1, ch2];
  }

}

module.exports = RouletteWheelSelection;
