package workscheduler.genetics.crossover;

import workscheduler.genetics.Chromosome;
import workscheduler.utils.Pair;

public interface Crossover {
  public static final double PROBABILITY = 0.65;

  public void crossover(Pair<Chromosome> parents);
}
