
'use strict';

class RouletteWheelSelection {

  selectParent() {
    const random = Math.random();

    for (let i = 0; i < this.population.length - 1; i += 1) {
      const entry = this.population[i];

      if (random < this.population[i].probability &&
          random >= (i > 0 ? this.population[i - 1].probability : 0)) {
        return entry.chromosome;
      }
    }

    return this.population[this.population.length - 1].chromosome;
  }

  setPopulation(population) {
    this.population = population;

    const sum = this.population.reduce((acc, entry) => {
      return acc + entry.fitness;
    }, 0);

    this.population.reduce((acc, entry) => {
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
