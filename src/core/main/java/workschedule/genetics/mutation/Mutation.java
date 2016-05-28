package workschedule.genetics.mutation;

import workschedule.genetics.Chromosome;

import java.util.List;

public interface Mutation {
  public static final double PROBABILITY = 0.01;

  public void mutate(List<Chromosome> population);
}
