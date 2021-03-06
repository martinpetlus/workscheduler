package workscheduler.genetics.mutation;

import workscheduler.genetics.Chromosome;

public interface Mutation {
  public static final double PROBABILITY = 0.01;

  public void mutate(Chromosome ... chromosomes);
}
