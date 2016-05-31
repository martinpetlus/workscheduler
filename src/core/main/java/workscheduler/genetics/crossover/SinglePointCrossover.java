package workscheduler.genetics.crossover;

import workscheduler.genetics.Chromosome;
import workscheduler.utils.MathUtils;
import workscheduler.utils.Pair;

public final class SinglePointCrossover extends AbstractCrossover {
  @Override
  protected void implementation(final Pair<Chromosome> parents) {
    // Last point of crossover is last but one
    int pos = MathUtils.randomInt(0, parents.one.getLength() - 2);

    // Exchange params of chromosomes from 0 to `pos`
    for (int i = 0; i <= pos; i += 1) {
      boolean tmp = parents.one.getGene(i);
      parents.one.setGene(i, parents.two.getGene(i));
      parents.two.setGene(i, tmp);
    }
  }
}
