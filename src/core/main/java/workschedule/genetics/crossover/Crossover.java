package workschedule.genetics.crossover;

import workschedule.genetics.Chromosome;
import workschedule.utils.Pair;

public interface Crossover {
  public static final double PROBABILITY = 0.65;

  public void crossover(Pair<Chromosome> parents);
}
