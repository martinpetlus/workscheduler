package workscheduler.genetics.crossover;

import workscheduler.genetics.Chromosome;
import workscheduler.utils.Pair;

public abstract class AbstractCrossover implements Crossover {
  @Override
  public void crossover(final Pair<Chromosome> parents) {
    if (Math.random() <= Crossover.PROBABILITY) {
      this.implementation(parents);
    }
  }

  protected abstract void implementation(final Pair<Chromosome> parents);
}
