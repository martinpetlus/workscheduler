
'use strict';

class RouletteWheelSelection {

  selectParent() {
    const random = Math.random();

    for (let i = 0; i < this.individuals.length - 1; i += 1) {
      const individual = this.individuals[i];

      if (random < this.individuals[i].probability &&
          random >= (i > 0 ? this.individuals[i - 1].probability : 0)) {
        return individual.chromosome;
      }
    }

    return this.individuals[this.individuals.length - 1].chromosome;
  }

  setPopulation(population) {
    this.individuals = population.map(chromosome => {
      return {
        chromosome,
        fitness: chromosome.fitness()
      };
    });

    const sum = this.individuals.reduce((acc, individual) => {
      return acc + individual.fitness;
    }, 0);

    this.individuals.reduce((acc, individual) => {
      return (individual.probability = acc + individual.fitness / sum);
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
