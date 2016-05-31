package workscheduler.genetics.mutation;

import workscheduler.genetics.Chromosome;

public final class StandardMutation implements Mutation {
  @Override
  public void mutate(Chromosome ... chromosomes) {
    for (Chromosome chromosome : chromosomes) {
      for (int j = 0; j < chromosome.getLength(); j += 1) {
        if (Math.random() < Mutation.PROBABILITY) {
          chromosome.setGene(j, !chromosome.getGene(j));
        }
      }
    }
  }
}
